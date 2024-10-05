import { call, put, takeLatest } from 'redux-saga/effects';

import {
    FETCH_PERMISSIONS_REQUEST,
    fetchPermissionsFailure,
    ADD_PERMISSION_REQUEST,
    addPermissionFailure,
    addPermissionRequest,
    fetchPermissionsSuccess,
    addPermissionSuccess,
    UPDATE_PERMISSION_REQUEST,
    updatePermissionFailure,
    updatePermissionSuccess,
    removePermissionSuccess,
    REMOVE_PERMISSION_REQUEST,
    removePermissionFailure,

} from '../actions';
import { API_CALL, TypeApiPromise } from 'API';
import { alertPush } from 'modules';

// Worker Saga: Fetch permissions
function* fetchPermissionsSaga() {
    try {
        const response: TypeApiPromise = yield call(API_CALL, { apiVersionUrl: 'peatio', url: '/admin/devops' })  // Replace with your API endpoint
        yield put(fetchPermissionsSuccess(response.response?.result as any));

    } catch (error: any) {
        yield put(fetchPermissionsFailure(error.message));
    }
}

// Worker Saga: Add a permission
function* addPermissionSaga(action: ReturnType<typeof addPermissionRequest>) {
    try {
        const { response, status }: TypeApiPromise = yield call(API_CALL, { apiVersionUrl: 'peatio', url: '/admin/devops', method: 'POST', body: action.payload })  // Replace with your API endpoint


        if (response && status === 200) {
            yield put(addPermissionSuccess(response?.result as any));
            return;
        }

        yield put(alertPush({ message: [response?.message?.error] }))
        yield put(addPermissionFailure(response?.message?.error));
    } catch (error: any) {
        yield put(addPermissionFailure(error.message));
    }
}



function* updatePermissionSaga(action: ReturnType<typeof addPermissionRequest>) {
    try {
        const { response, status }: TypeApiPromise = yield call(API_CALL, { apiVersionUrl: 'peatio', url: `/admin/devops/${action.payload._id}`, method: 'PUT', body: action.payload })  // Replace with your API endpoint


        if (response && status === 200) {
            yield put(updatePermissionSuccess(response?.result as any));
            return;
        }

        yield put(alertPush({ message: [response?.message?.error] }))
        yield put(updatePermissionFailure(response?.message?.error));
    } catch (error: any) {
        yield put(addPermissionFailure(error.message));
    }
}


function* removePermissionSaga(action: ReturnType<typeof addPermissionRequest>) {
    try {
        const { response, status }: TypeApiPromise = yield call(API_CALL, { apiVersionUrl: 'peatio', url: `/admin/devops/${action.payload}`, method: 'delete'  })  // Replace with your API endpoint

        console.log(response)

        if (response && status === 200) {
            yield put(removePermissionSuccess(response?.result?._id as any));
            return;
        }

        yield put(alertPush({ message: [response?.message?.error] }))
        yield put(removePermissionFailure(response?.message?.error));
    } catch (error: any) {
        yield put(removePermissionFailure(error.message));
    }
}


// Watcher Saga
export function* devopsSaga() {
    yield takeLatest(FETCH_PERMISSIONS_REQUEST, fetchPermissionsSaga);
    yield takeLatest(REMOVE_PERMISSION_REQUEST, removePermissionSaga);
    yield takeLatest(UPDATE_PERMISSION_REQUEST, updatePermissionSaga);
    yield takeLatest(ADD_PERMISSION_REQUEST, addPermissionSaga);
}
