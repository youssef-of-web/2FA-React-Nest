import { Body, Controller, Post } from '@nestjs/common';
import {
  DisableOTPDto,
  LoginDto,
  RegisterDto,
  VerifyOTPDto,
} from 'src/dto/auth.dto';
import {
  IDisabledOTP,
  IGenOTP,
  ILogin,
  IRegister,
  IVerifyOTP,
} from 'src/interfaces/auth.interface';
import { AuthService } from './auth.service';

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
   * @param body
   * @returns {}
   */

  @Post('/enable-otp')
  EnableOTP(@Body('id') id: string) {
    return this.twoFactorService.EnableOTP(id);
  }

  /**
   *
   * @param Id
   * @returns {IGenOTP}
   */

  @Post('/gen-otp')
  GenOTP(@Body('id') id: string) {
    return this.twoFactorService.GenOTP(id);
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

  /**
   *
   * @param body
   * @returns
   */

  @Post('/logout')
  LogOut(@Body('id') id: string) {
    return this.twoFactorService.Logout(id);
  }
}
