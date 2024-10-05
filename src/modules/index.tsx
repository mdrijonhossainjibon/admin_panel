import { combineReducers } from 'redux';


import { all, call } from 'redux-saga/effects';
import { publicReducer, usersReducer } from './app';
import { adjustmentRoot, AdjustmentState, AlertState, devopsSaga, DevOpsState, LanguageState, rangerSaga, RangerState, rootalertsaga, TelegramUsersState, userlistSaga, UserListState } from './public';
import {   AuthState, rootactivitiesSaga, rootAuthSaga } from './users';




export const rootReducer = combineReducers({ public: publicReducer, users: usersReducer });

export function* rootSaga() {
    yield all([
        call(rootalertsaga),
        call(devopsSaga),
        call(rootAuthSaga),
        call(rangerSaga),
        call(rootactivitiesSaga),
        call(adjustmentRoot),
        call(userlistSaga)
    ])

}

export interface RootState {
    public: {
        alerts: AlertState; 
        devops: DevOpsState;
        i18n : LanguageState;
        ranger : RangerState;
        userlist : UserListState;
        adjustments :  AdjustmentState;
        telegramUsers: TelegramUsersState  
    };
    users : {
        auth : AuthState
    }
}


export * from './public';
export * from './users';
export * from './types';