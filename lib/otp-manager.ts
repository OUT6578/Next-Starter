const otpStore: { [key: string]: { otp: string; expires: number } } = {};

export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function storeOTP(mobile: string, otp: string, expiryMinutes: number = 10): void {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  otpStore[mobile] = { otp, expires: expiryTime };
}

export function verifyOTP(mobile: string, otp: string): boolean {
  const stored = otpStore[mobile];

  if (!stored) {
    return false;
  }

  if (Date.now() > stored.expires) {
    delete otpStore[mobile];
    return false;
  }

  if (stored.otp !== otp) {
    return false;
  }

  delete otpStore[mobile];
  return true;
}

export function sendOTPToMobile(mobile: string, otp: string): boolean {
  console.log(`[OTP Simulation] Sending OTP ${otp} to ${mobile}`);
  return true;
}
