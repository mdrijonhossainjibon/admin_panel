import { FETCH_TELEGRAM_USERS_REQUEST, FETCH_TELEGRAM_USERS_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS  } from './constants';

interface FetchUserRequestAction {
    type: typeof FETCH_USER_REQUEST;
}

interface FetchUserSuccessAction {
    type: typeof FETCH_USER_SUCCESS,
    payload: any
}

interface FetchUserFailureAction {
    type: typeof FETCH_USER_FAILURE,
    payload: any
}

export type UserActions = FetchUserRequestAction | FetchUserSuccessAction | FetchUserFailureAction;


export const fetchUserRequest = () => ({
    type: FETCH_USER_REQUEST,
});



export const fetchUserTgRequest = () => ({
    type: FETCH_TELEGRAM_USERS_REQUEST,
});


export const fetchTelegramUsersSuccess = (users: any[]) => ({
    type: FETCH_TELEGRAM_USERS_SUCCESS,
    payload: users
});
export const fetchUseraddSuccess = (payload: FetchUserSuccessAction['payload']): FetchUserSuccessAction => ({
    type: FETCH_USER_SUCCESS,
    payload
});

export const fetchUserFailure = (payload : FetchUserFailureAction['payload']) : FetchUserFailureAction=> ({
    type: FETCH_USER_FAILURE,
    payload 
});