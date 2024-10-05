import { takeLatest } from "redux-saga/effects";
import { FETCH_ADJUSTMENTS_REQUEST } from "../constants";

export   function *  adjustmentRoot( ) {
    yield takeLatest(FETCH_ADJUSTMENTS_REQUEST,  handeladjustmentSaga);
}


function * handeladjustmentSaga( ) {
    
}