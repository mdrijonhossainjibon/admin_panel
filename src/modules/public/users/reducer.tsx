 
import { UserActions } from "./action";
import { FETCH_TELEGRAM_USERS_FAILURE, FETCH_TELEGRAM_USERS_REQUEST, FETCH_TELEGRAM_USERS_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, RESET_TELEGRAM_USERS } from "./constants";

export interface User {
    _id: string;
    email: string;
    password: string;
    uid: string;
    role: string;
    level: number;
    two_factor_auth: boolean;
    status: string;
    referral_uid: string | null;
    data: string;
    profile: any[];
    documents: any[];
    labels: any[];
    phones: any[]
    created_at: string;
    updated_at: string;
    __v: number;
    avater: string;
}


export interface UserListState {
    user: User[];
    loading: false;
}




const initialState: UserListState = {
    user: [],
    loading : false
}


export interface TelegramUsersState {
    loading: boolean;
    users: any[];
    error: string | null;
}

const telegraminitialState: TelegramUsersState = {
    loading: false,
    users: [],
    error: null
};

export const userListReducer = (state = initialState, action: UserActions) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
          return { ...state , loading :  true }
        case FETCH_USER_SUCCESS:
            return { ...state, user: action.payload , loading : false  }
        default:

            return state;

    } 
}





export const telegramUsersReducer = (state = telegraminitialState, action: any): TelegramUsersState => {
    switch (action.type) {
        case FETCH_TELEGRAM_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        
        case FETCH_TELEGRAM_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: null };
        
        case FETCH_TELEGRAM_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        case RESET_TELEGRAM_USERS:
            return telegraminitialState;
        
        default:
            return state;
    }
};