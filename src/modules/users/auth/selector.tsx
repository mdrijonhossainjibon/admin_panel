import { RootState } from "modules";
import { AuthState } from "./reducer";

 

// Selector to get the user
export const selectUser = (state: RootState): AuthState['user'] => state.users.auth.user;
 

// Selector to get the loading state
export const selectAuthLoading = (state: RootState): AuthState['loading'] => state.users.auth.loading;

// Selector to get any authentication error
export const selectAuthError = (state: RootState): AuthState['error'] => state.users.auth.error;

// Selector to check if OTP is verified
export const selectOtpVerified = (state: RootState): AuthState['otpVerified'] => state.users.auth.otpVerified;

// Selector to check if 2FA is verified
export const selectTwoFactorAuthVerified = (state: RootState): AuthState['twoFactorAuthVerified'] => state.users.auth.twoFactorAuthVerified;

// Selector to check if the password was successfully changed
export const selectPasswordChanged = (state: RootState): AuthState['passwordChanged'] => state.users.auth.passwordChanged;

// Selector to check if the password reset was successful
export const selectPasswordReset = (state: RootState): AuthState['passwordReset'] => state.users.auth.passwordReset;
