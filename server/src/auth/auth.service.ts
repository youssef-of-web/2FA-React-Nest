import { Injectable } from '@nestjs/common';
import {
  DisableOTPDto,
  GenOTPDto,
  LoginDto,
  RegisterDto,
  VerifyOTPDto,
} from 'src/dto/auth.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  Register(User: RegisterDto) {
    return User;
  }

  Login(User: LoginDto) {
    return User;
  }

  GenOTP(Id: GenOTPDto) {
    return Id;
  }

  VerifyOTP(body: VerifyOTPDto) {
    return body;
  }

  DisableOTP(body: DisableOTPDto) {
    return body;
  }
}
