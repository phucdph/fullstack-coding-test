import { AuthErrorCodes } from "firebase/auth";

export const authErrorMessages = {
  [AuthErrorCodes.INVALID_EMAIL]: "Invalid email or password.",
  [AuthErrorCodes.INVALID_PASSWORD]: "Invalid email or password.",
  [AuthErrorCodes.WEAK_PASSWORD]: "Password should be at least 6 characters",
  [AuthErrorCodes.EMAIL_EXISTS]: "This email is already in use.",
};

export const commonErrorMessage = "Something went wrong. Please try again.";
