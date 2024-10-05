
import { AuthActionTypes } from "./actions";
import { LOGOUT, OTP_VERIFY_FAILURE, OTP_VERIFY_REQUEST, OTP_VERIFY_SUCCESS, PASSWORD_CHANGE_FAILURE, PASSWORD_CHANGE_REQUEST, PASSWORD_CHANGE_SUCCESS, PASSWORD_RESET_FAILURE, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, REQUEST_ERROR, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS, TWO_FACTOR_AUTH_VERIFY_FAILURE, TWO_FACTOR_AUTH_VERIFY_REQUEST, TWO_FACTOR_AUTH_VERIFY_SUCCESS } from "./constants";




export interface AuthState {
    user: any | null;
    loading: boolean;
    error: string | null;
    otpVerified: boolean;
    twoFactorAuthVerified: boolean;
    passwordChanged: boolean;
    passwordReset: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    otpVerified: false,
    twoFactorAuthVerified: false,
    passwordChanged: false,
    passwordReset: false,
};


export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SIGNIN_REQUEST:
        case PASSWORD_CHANGE_REQUEST:
        case PASSWORD_RESET_REQUEST:
        case OTP_VERIFY_REQUEST:
        case TWO_FACTOR_AUTH_VERIFY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };

        case SIGNIN_FAILURE:
        case PASSWORD_CHANGE_FAILURE:
        case PASSWORD_RESET_FAILURE:
        case OTP_VERIFY_FAILURE:
        case TWO_FACTOR_AUTH_VERIFY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                otpVerified: false,
                twoFactorAuthVerified: false,
            };

        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                passwordChanged: true,
                error: null,
            };

        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                passwordReset: true,
                error: null,
            };

        case OTP_VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                otpVerified: true,
                error: null,
            };

        case TWO_FACTOR_AUTH_VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                twoFactorAuthVerified: true,
                error: null,
            };

        case REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

