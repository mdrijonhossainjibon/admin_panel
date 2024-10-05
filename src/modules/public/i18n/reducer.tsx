 
import { ChangeLanguageAction } from './actions';
import { CHANGE_LANGUAGE } from './constants';

export interface LanguageState {
	lang: string;
}

const defaultLanguage = {
	code: 'en',
};

const currentLang: string = localStorage.getItem('i18nextLng') || defaultLanguage.code;

export const initialChangeLanguageState: LanguageState = {
	lang: currentLang,
};

export const changeLanguageReducer = (state = initialChangeLanguageState, action: ChangeLanguageAction) => {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			localStorage.setItem('i18nextLng', action.payload);

			return {
				lang: action.payload,
			};
		default:
			return state;
	}
};
