import { combineReducers } from "redux";
import { alertReducer, changeLanguageReducer, devopsReducer, rangerReducer, userListReducer , adjustmentReducer, telegramUsersReducer, TelegramReducer  } from './public';
import { activitiesReducer, authReducer } from "./users";
 



export const publicReducer = combineReducers({
    alerts: alertReducer,
    devops: devopsReducer,
    i18n: changeLanguageReducer,
    ranger : rangerReducer,
    userlist : userListReducer,
    telegramUsers: telegramUsersReducer,
    adjustments: adjustmentReducer,
    Telegram : TelegramReducer

});

export const usersReducer = combineReducers({
    auth: authReducer,
    activities : activitiesReducer
});



