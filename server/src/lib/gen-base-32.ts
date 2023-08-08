import * as crypto from 'crypto';
import * as base32Encode from 'hi-base32';
export const generateSecretRandomBase32 = () => {
  const buffer = crypto.randomBytes(20);
  const truncatedBase32 = base32Encode
    .encode(buffer)
    .replace(/=/g, '')
    .substring(0, 24);

  return truncatedBase32;
};
