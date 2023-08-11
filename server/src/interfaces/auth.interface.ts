export interface IRegister {
  message: string;
}

export interface ILogin {
  id: string;
  fullname: string;
  email: string;
  otp_enabled: boolean;
  otp_validated: boolean;
}

export interface IGenOTP {
  otp_url: string;
  otp_secret: string;
}

export interface IVerifyOTP {
  otp_enabled: boolean;
}

export interface IValidateOTP {
  otp_validated: boolean;
}

export interface IDisabledOTP {
  otp_enabled: boolean;
  otp_validated: boolean;
}
