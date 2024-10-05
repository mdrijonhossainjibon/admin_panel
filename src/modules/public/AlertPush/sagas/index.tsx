import { takeLatest } from 'redux-saga/effects';
import { ALERT_PUSH } from '../constants';
import { alertPushSaga } from './handleAlertSaga';  // Ensure correct naming and import

// Saga function that handles the ALERT_PUSH action
export function* rootalertsaga() {
    yield takeLatest(ALERT_PUSH, alertPushSaga);
}
