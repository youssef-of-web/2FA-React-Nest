export interface IRegister {
  message: string;
}

export interface ILogin {
  id: string;
  fullname: string;
  email: string;
  opt_enabled: boolean;
}

export interface IGenOTP {
  otp_url: string;
  otp_secret: string;
}

export interface IVerifyOTP {
  id: string;
  fullname: string;
  email: string;
  opt_enabled: boolean;
}

export interface IDisabledOTP {
  id: string;
  fullname: string;
  email: string;
  opt_enabled: boolean;
}
