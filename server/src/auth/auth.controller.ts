import { Body, Controller, Post } from '@nestjs/common';
import {
  DisableOTPDto,
  GenOTPDto,
  LoginDto,
  RegisterDto,
  VerifyOTPDto,
} from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import {
  IDisabledOTP,
  IGenOTP,
  ILogin,
  IRegister,
  IVerifyOTP,
} from 'src/interfaces/auth.interface';

@Controller('/')
export class AuthController {
  constructor(private readonly twoFactorService: AuthService) {}

  /**
   *
   * @param User
   * @returns {IRegister}
   */

  @Post('/register')
  Register(@Body() User: RegisterDto) {
    return this.twoFactorService.Register(User);
  }

  /**
   *
   * @param User
   * @returns {ILogin}
   */

  @Post('/login')
  Login(@Body() User: LoginDto) {
    return this.twoFactorService.Login(User);
  }

  /**
   *
   * @param Id
   * @returns {IGenOTP}
   */

  @Post('/gen-otp')
  GenOTP(@Body() Id: GenOTPDto) {
    return this.twoFactorService.GenOTP(Id);
  }

  /**
   *
   * @param body
   * @returns {IVerifyOTP}
   */

  @Post('/verify-otp')
  VerifyOTP(@Body() body: VerifyOTPDto) {
    return this.twoFactorService.VerifyOTP(body);
  }

  /**
   *
   * @param body
   * @returns {IDisabledOTP}
   */

  @Post('/disable-otp')
  DisableOTP(@Body() body: DisableOTPDto) {
    return this.twoFactorService.DisableOTP(body);
  }
}