import { LOGOUT, OTP_VERIFY_FAILURE, OTP_VERIFY_REQUEST, OTP_VERIFY_SUCCESS, PASSWORD_CHANGE_FAILURE, PASSWORD_CHANGE_REQUEST, PASSWORD_CHANGE_SUCCESS, PASSWORD_RESET_FAILURE, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, REQUEST_ERROR, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_REQUEST_USER, SIGNIN_SUCCESS, TWO_FACTOR_AUTH_VERIFY_FAILURE, TWO_FACTOR_AUTH_VERIFY_REQUEST, TWO_FACTOR_AUTH_VERIFY_SUCCESS } from "./constants";



export interface SignInRequestAction {
    type: typeof SIGNIN_REQUEST;
	payload : { 
		email ?: string;
		password ? : string;
		hash ?: string;
		history  ?: any
	 }
}

export interface SignInSuccessAction {
    type: typeof SIGNIN_SUCCESS;
    payload: { user: any; token: string };
}

export interface SignInFailureAction {
    type: typeof SIGNIN_FAILURE;
    payload: string;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export interface PasswordChangeRequestAction {
    type: typeof PASSWORD_CHANGE_REQUEST;
}

export interface PasswordChangeSuccessAction {
    type: typeof PASSWORD_CHANGE_SUCCESS;
}

export interface PasswordChangeFailureAction {
    type: typeof PASSWORD_CHANGE_FAILURE;
    payload: string;
}

export interface PasswordResetRequestAction {
    type: typeof PASSWORD_RESET_REQUEST;
}

export interface PasswordResetSuccessAction {
    type: typeof PASSWORD_RESET_SUCCESS;
}

export interface PasswordResetFailureAction {
    type: typeof PASSWORD_RESET_FAILURE;
    payload: string;
}

export interface OtpVerifyRequestAction {
    type: typeof OTP_VERIFY_REQUEST;
}

export interface OtpVerifySuccessAction {
    type: typeof OTP_VERIFY_SUCCESS;
}

export interface OtpVerifyFailureAction {
    type: typeof OTP_VERIFY_FAILURE;
    payload: string;
}

export interface TwoFactorAuthVerifyRequestAction {
    type: typeof TWO_FACTOR_AUTH_VERIFY_REQUEST;
}

export interface TwoFactorAuthVerifySuccessAction {
    type: typeof TWO_FACTOR_AUTH_VERIFY_SUCCESS;
}

export interface TwoFactorAuthVerifyFailureAction {
    type: typeof TWO_FACTOR_AUTH_VERIFY_FAILURE;
    payload: string;
}

export interface RequestErrorAction {
    type: typeof REQUEST_ERROR;
    payload: string;
}

export type AuthActionTypes =
    | SignInRequestAction
    | SignInSuccessAction
    | SignInFailureAction
    | LogoutAction
    | PasswordChangeRequestAction
    | PasswordChangeSuccessAction
    | PasswordChangeFailureAction
    | PasswordResetRequestAction
    | PasswordResetSuccessAction
    | PasswordResetFailureAction
    | OtpVerifyRequestAction
    | OtpVerifySuccessAction
    | OtpVerifyFailureAction
    | TwoFactorAuthVerifyRequestAction
    | TwoFactorAuthVerifySuccessAction
    | TwoFactorAuthVerifyFailureAction
    | RequestErrorAction;

 
	export const signInRequest = (payload : SignInRequestAction['payload']): AuthActionTypes => ({
		type: SIGNIN_REQUEST,
		payload  
	});
	
    export const signInUserRequest = ()=>({
		type : SIGNIN_REQUEST_USER
	})


	export const signInSuccess = (payload :any): AuthActionTypes => ({
		type: SIGNIN_SUCCESS,
		payload 
	});
	
	export const signInFailure = (error: string): AuthActionTypes => ({
		type: SIGNIN_FAILURE,
		payload: error,
	});
	
	// Logout Action
	export const logout = (): AuthActionTypes => ({
		type: LOGOUT,
	});
	
	// Password Change Actions
	export const passwordChangeRequest = (): AuthActionTypes => ({
		type: PASSWORD_CHANGE_REQUEST,
	});
	
	export const passwordChangeSuccess = (): AuthActionTypes => ({
		type: PASSWORD_CHANGE_SUCCESS,
	});
	
	export const passwordChangeFailure = (error: string): AuthActionTypes => ({
		type: PASSWORD_CHANGE_FAILURE,
		payload: error,
	});
	
	// Password Reset Actions
	export const passwordResetRequest = (): AuthActionTypes => ({
		type: PASSWORD_RESET_REQUEST,
	});
	
	export const passwordResetSuccess = (): AuthActionTypes => ({
		type: PASSWORD_RESET_SUCCESS,
	});
	
	export const passwordResetFailure = (error: string): AuthActionTypes => ({
		type: PASSWORD_RESET_FAILURE,
		payload: error,
	});
	
	// OTP Verification Actions
	export const otpVerifyRequest = (): AuthActionTypes => ({
		type: OTP_VERIFY_REQUEST,
	});
	
	export const otpVerifySuccess = (): AuthActionTypes => ({
		type: OTP_VERIFY_SUCCESS,
	});
	
	export const otpVerifyFailure = (error: string): AuthActionTypes => ({
		type: OTP_VERIFY_FAILURE,
		payload: error,
	});
	
	// 2FA Verification Actions
	export const twoFactorAuthVerifyRequest = (): AuthActionTypes => ({
		type: TWO_FACTOR_AUTH_VERIFY_REQUEST,
	});
	
	export const twoFactorAuthVerifySuccess = (): AuthActionTypes => ({
		type: TWO_FACTOR_AUTH_VERIFY_SUCCESS,
	});
	
	export const twoFactorAuthVerifyFailure = (error: string): AuthActionTypes => ({
		type: TWO_FACTOR_AUTH_VERIFY_FAILURE,
		payload: error,
	});
	
	// Request Error Action
	export const requestError = (error: string): AuthActionTypes => ({
		type: REQUEST_ERROR,
		payload: error,
	});
	