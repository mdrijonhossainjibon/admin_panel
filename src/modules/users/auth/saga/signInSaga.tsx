
import { API_CALL, TypeApiPromise, API_CALL_PROPS } from 'API';

import { signInFailure, SignInRequestAction, signInSuccess } from '../actions';
import { alertPush, changeLanguage } from 'modules';
import { call, put } from 'redux-saga/effects';
import { getCsrfToken, setCsrfToken } from 'helpers';
 


const signConfig: API_CALL_PROPS = {
	apiVersion: '1.0', apiVersionUrl: 'barong' 
};

export function* signInSaga(action: SignInRequestAction) {

	try {


		const { response, status }: TypeApiPromise = yield call(API_CALL, { ...signConfig, url: '/identity/sessions', method: 'POST', body: action.payload })
		
		console.log(response)

		if (response) {
			if ( status === 200 && response.result && response.result.user) {

				setCsrfToken(response.result.user.csrf_token as string)
				yield put(signInSuccess(response.result.user));
				const { language } = JSON.parse(response.result.user.data)
	
				yield put(changeLanguage(language))
				
				return;
			}
	
			 
			if (response?.message?.error === 'identity.session.ipdetect') {
				localStorage.setItem('countdown' , '120')
				return  action.payload.history.push('/email/verify');
	
			}
			   
			if (response.message  && response.message.error) {
				yield put(alertPush({ message: [response?.message?.error] }));
	
			    yield put(signInFailure(response?.message?.error));
				return;
			}
	
		}


	} catch (error: any) {
		yield put(alertPush({ message: [error.message] }));

		yield put(signInFailure(error));
	}
}


export function* siginUser(action: SignInRequestAction) {
	try {

		
		const { response, status }: TypeApiPromise = yield call(API_CALL, { ...signConfig, url: '/identity/sessions/verify', method: 'POST',  headers : {  "X-CSRF-Token" : getCsrfToken()  } })

		if (response && status === 200 && response.result && response.result.user) {
			yield put(signInSuccess(response.result.user));
			const { language } = JSON.parse(response.result.user.data)

			yield put(changeLanguage(language));
			return;
		}

		 
		yield put(signInFailure(response?.message?.error));
	} catch (error) {

	}
}