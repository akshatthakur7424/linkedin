export const generateOtp = (): number => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const otpNumber: number = generateOtp();
