import { delay, put } from 'redux-saga/effects';
import { AlertPush, alertData, alertDeleteAll, Alert } from '../actions'; // Make sure to import the Alert type
import i18n from 'i18n';

export function*  alertPushSaga(actions: AlertPush) {
  const { t } = i18n;
  const message = actions.payload?.message || ['null'];

  // Modify the payload to match the expected type (assuming "web" is the default type)
  yield put(
    alertData({
      ...actions.payload,
      type: actions.payload?.type || 'web',
      message: [t(message[0], { interpolation: { escapeValue: false }, ...message[1] })],
    } as Alert) // Use "as Alert" to assert the type
  );

  yield delay(2000);
  yield put(alertDeleteAll());
}
