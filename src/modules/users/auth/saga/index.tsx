 
import { takeEvery } from 'redux-saga/effects';
import { signInSaga , siginUser } from './signInSaga';
import { SIGNIN_REQUEST, SIGNIN_REQUEST_USER } from '../constants';
 


export function* rootAuthSaga() {
	yield takeEvery(SIGNIN_REQUEST , signInSaga);
	yield takeEvery(SIGNIN_REQUEST_USER , siginUser );
}