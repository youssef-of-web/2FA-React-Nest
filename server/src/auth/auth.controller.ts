import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  DisableOTPDto,
  LoginDto,
  RegisterDto,
  ValidateOTPDto,
  VerifyOTPDto,
} from 'src/dto/auth.dto';
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
  @HttpCode(200)
  @Post('/verify-otp')
  VerifyOTP(@Body() body: VerifyOTPDto) {
    return this.twoFactorService.VerifyOTP(body);
  }

  /**
   *
   * @param body
   * @returns {IVerifyOTP}
   */
  @HttpCode(200)
  @Post('/validate-otp')
  ValidateOTP(@Body() body: ValidateOTPDto) {
    return this.twoFactorService.ValidateOTP(body);
  }

  /**
   *
   * @param body
   * @returns {IDisabledOTP}
   */
  @HttpCode(200)
  @Post('/disable-otp')
  DisableOTP(@Body() body: DisableOTPDto) {
    return this.twoFactorService.DisableOTP(body);
  }

  /**
   *
   * @param body
   * @returns
   */
  @HttpCode(200)
  @Post('/logout')
  LogOut(@Body('id') id: string) {
    return this.twoFactorService.Logout(id);
  }
}
