import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import * as OTPAuth from 'otpauth';
import {
  DisableOTPDto,
  LoginDto,
  RegisterDto,
  ValidateOTPDto,
  VerifyOTPDto,
} from 'src/dto/auth.dto';
import {
  IDisabledOTP,
  IGenOTP,
  ILogin,
  IRegister,
  IValidateOTP,
  IVerifyOTP,
} from 'src/interfaces/auth.interface';
import { generateSecretRandomBase32 } from '../lib/gen-base-32';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async Register(User: RegisterDto): Promise<IRegister> {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: User.email,
      },
    });

    if (existUser) {
      throw new HttpException('User Exist', HttpStatus.CONFLICT);
    }

    const hash = await bcrypt.hash(User?.password, 10);
    const payload = {
      fullname: User.fullname,
      email: User.email,
      password: hash,
      otp_enabled: false,
    };
    await this.prisma.user.create({
      data: payload,
    });

    return { message: 'success' };
  }

  async Login(User: LoginDto): Promise<ILogin> {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: User.email,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(User.password, existUser.password);

    if (!isMatch) {
      throw new HttpException('INVALID PASSWORD', HttpStatus.BAD_REQUEST);
    }

    const payload: ILogin = {
      id: existUser.id,
      email: existUser.email,
      fullname: existUser.fullname,
      otp_enabled: existUser.otp_enabled,
      otp_validated: existUser.otp_validated,
    };

    return payload;
  }

  async GenOTP(id: string): Promise<IGenOTP> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }
    const base32Secret = generateSecretRandomBase32();
    const totp = new OTPAuth.TOTP({
      issuer: 'TENSORCODE',
      label: 'TensorCodeTwoFactorAuth',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: base32Secret,
    });
    const uri = totp.toString();

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        otp_authurl: uri,
        otp_secret: base32Secret,
      },
    });

    return {
      otp_url: uri,
      otp_secret: base32Secret,
    };
  }

  async VerifyOTP(body: VerifyOTPDto): Promise<IVerifyOTP> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const totp = new OTPAuth.TOTP({
      issuer: 'TENSORCODE',
      label: 'TensorCodeTwoFactorAuth',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: existUser.otp_secret,
    });

    const delta = totp.validate({ token: body.token });

    if (delta === null) {
      throw new HttpException('INVALID TOKEN', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        otp_enabled: true,
      },
    });
    return {
      otp_enabled: newUser.otp_enabled,
    };
  }

  async ValidateOTP(body: ValidateOTPDto): Promise<IValidateOTP> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const totp = new OTPAuth.TOTP({
      issuer: 'TENSORCODE',
      label: 'TensorCodeTwoFactorAuth',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: existUser.otp_secret,
    });

    const delta = totp.validate({ token: body.token });

    if (delta === null) {
      throw new HttpException('INVALID TOKEN', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        otp_validated: true,
      },
    });
    return {
      otp_validated: newUser.otp_validated,
    };
  }

  async DisableOTP(body: DisableOTPDto): Promise<IDisabledOTP> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        otp_enabled: false,
        otp_validated: false,
      },
    });
    return {
      otp_enabled: newUser.otp_enabled,
      otp_validated: newUser.otp_validated,
    };
  }

  async Logout(id: string) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!existUser) {
      throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        otp_validated: false,
      },
    });
    return {
      otp_validated: newUser.otp_validated,
    };
  }
}
