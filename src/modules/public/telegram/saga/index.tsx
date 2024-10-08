import { call, put, takeLatest } from 'redux-saga/effects';
 
import { fetchBotConfigFailure, fetchBotConfigRequest, fetchBotConfigSuccess, fetchChannelConfigRequest, fetchChannelConfigSuccess  } from '../action';
import { DELETE_CHANNEL_CONFIG_FAILURE, DELETE_CHANNEL_CONFIG_REQUEST, FETCH_BOT_CONFIG_REQUEST, FETCH_CHANNEL_CONFIG_REQUEST, PUT_BOT_CONFIG_REQUEST, PUT_CHANNEL_CONFIG_REQUEST } from '../constants';
import { API_CALL, API_CALL_PROPS, TypeApiPromise } from 'API';
import { alertPush } from 'modules';
 

 

const config : API_CALL_PROPS  = { baseURL : 'http://localhost:8080/' }

// Worker saga for fetching bot configuration
function* fetchBotConfigSaga() {
    try {
         const {  response  } : TypeApiPromise = yield call(API_CALL , {  ...config ,  url : 'config'  });
          yield put(fetchBotConfigSuccess(response as any))
    } catch (error: any) {
        yield put(fetchBotConfigFailure(error.message));
    }
}

// Worker saga for fetching channel configuration
function* fetchChannelConfigSaga() {
    try {
        const {  response  } : TypeApiPromise = yield call(API_CALL , {  ...config ,  url : 'channels'  });
         yield put(fetchChannelConfigSuccess(response?.result as any))
   } catch (error: any) {
       //yield put(fetchBotConfigFailure(error.message));
   }
}


function* putBotConfigSaga(action: any) {
    try {
        const {  response , status  } : TypeApiPromise = yield call(API_CALL , { ...config ,  url : 'config' , body : action.payload, method : 'post'  });
         
        if (status === 200 && response) {
            yield put(fetchBotConfigRequest());
            yield put(alertPush({ message : [ response?.message?.success ] , show : 'success'}));
            return;
        }
       
      yield put(alertPush({ message : [response?.message?.error]}));
    } catch (error: any) {
       // yield put({ type: PUT_BOT_CONFIG_FAILURE, payload: error.message });
    }
}
 

function* putChannelConfigSaga(action: any) {
    try {
        const {  response , status } : TypeApiPromise = yield call(API_CALL , { ...config ,  url : 'channels' , body : action.payload, method : 'POST'  });
        if (status === 201 &&   response) {
            yield put(fetchBotConfigRequest());
            yield put(alertPush({ message : [ response?.message?.success ] , show : 'success'}));
             return;
        }
        if (status === 200 &&   response) {
            yield put(fetchChannelConfigRequest());
            yield put(alertPush({ message : [ response?.message?.success ] , show : 'success'}));
             return;
        }
        
        yield put(alertPush({ message : [ response?.message?.error ]}));

       // yield put({ type: PUT_CHANNEL_CONFIG_SUCCESS, payload: response.data });
    } catch (error: any) {
      
    }
}

function* deleteChannelConfigSaga(action: any) {
    try {
        
        const {  response  } : TypeApiPromise = yield call(API_CALL , { ...config ,  url : 'channel' , body : action.payload, method : 'DELETE'  });
          console.log( response )
          yield put(fetchChannelConfigRequest());
    } catch (error: any) {
        yield put({ type: DELETE_CHANNEL_CONFIG_FAILURE, payload: error.message });
    }
}

// Combine all sagas into one root saga
export   function* TelegramRootSaga() {
    yield takeLatest(PUT_CHANNEL_CONFIG_REQUEST, putChannelConfigSaga);
    yield takeLatest(DELETE_CHANNEL_CONFIG_REQUEST, deleteChannelConfigSaga);
    yield takeLatest(PUT_BOT_CONFIG_REQUEST, putBotConfigSaga);
    yield takeLatest(FETCH_BOT_CONFIG_REQUEST, fetchBotConfigSaga);
    yield takeLatest(FETCH_CHANNEL_CONFIG_REQUEST, fetchChannelConfigSaga);
}
