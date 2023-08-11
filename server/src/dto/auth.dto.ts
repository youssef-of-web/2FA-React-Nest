import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: number;
}
export class GenOTPDto {
  @IsNotEmpty()
  id: string;
}

export class VerifyOTPDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  token: string;
}

export class ValidateOTPDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  token: string;
}

export class DisableOTPDto {
  @IsNotEmpty()
  id: string;
}
