import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_ACTIVITIES_REQUEST } from "../constants";
import { API_CALL, API_CALL_PROPS, TypeApiPromise } from "API";
import { fetchActivitiesSuccess } from "../action";

const signConfig: API_CALL_PROPS = {
	apiVersion: '1.0', apiVersionUrl: 'barong' , url: '/identity/sessions/activities' 
};


function* handelSaga() {
    const { response }: TypeApiPromise = yield call(API_CALL, { ...signConfig });
   if (response) {
    yield put(fetchActivitiesSuccess(response.result as any ))
    console.log(response?.result)
   }
}




export function* rootactivitiesSaga() {
    yield takeEvery(FETCH_ACTIVITIES_REQUEST, handelSaga)
}
