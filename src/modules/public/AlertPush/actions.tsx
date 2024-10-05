
///import { NotificationPlacement } from 'antd/es/notification/interface';

import { ALERT_DATA, ALERT_DELETE, ALERT_DELETE_BY_INDEX, ALERT_PUSH,ALERT_DELETE_ALL } from './constants';

export type  Status =  'success' | 'warning' | 'error' | 'open';

export type PlacementPlayload =  'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft'  | 'bottomRight'; 
export interface Alert {
	type ?: 'web';
    show ? : Status 
	message ? :  AlertMessage ;
	confing ?: {
		placement ? : PlacementPlayload
   } 
}



export interface AlerstMessage {
	type ? : 'message'
	message ? :  AlertMessage ;
	status   : Status |  'loading';
	
}

export interface MobileAlerPush {
	type ?: 'mobile'
	message ? :  AlertMessage ;
	confing ?: { 
		duration ?: number;
		position ?: 'center' | 'top' | 'bottom';
		maskClickable ? : boolean;
		
	};
	icon ?: 'loading' | 'fail' | 'success'
}

export type AlertMessage = [string ,Options ?] ;

export type Options = {
	amount ?: number; 
	currency?: string
	price ?: number;
	key? : string;
}


type AlertPushPayload = AlerstMessage | Alert | MobileAlerPush;

export interface AlertPush {
	type: typeof ALERT_PUSH;
	payload:  AlertPushPayload ;
    [key: string] : any;
}

export interface AlertData {
	type: typeof ALERT_DATA;
	payload: Alert;
}

export interface AlertDelete {
	type: typeof ALERT_DELETE;
}
export interface AlertDeleteAll {
	type: typeof ALERT_DELETE_ALL;
}

export interface AlertDeleteByIndex {
	type: typeof ALERT_DELETE_BY_INDEX;
	index: number;
}

export type AlertAction = AlertPush | AlertData | AlertDelete | AlertDeleteAll | AlertDeleteByIndex;

export const alertPush = (payload: AlertPush['payload']): AlertPush => ({
	type: ALERT_PUSH,
	payload,
});


export const alertData = (payload: AlertData['payload']): AlertData => ({
	type: ALERT_DATA,
	payload,
});

export const alertDelete = (): AlertDelete => ({
	type: ALERT_DELETE,
});


export const alertDeleteAll = (): AlertDeleteAll => ({
	type: ALERT_DELETE_ALL,
});


export const alertDeleteByIndex = (index: number): AlertDeleteByIndex => ({
	type: ALERT_DELETE_BY_INDEX,
	index,
});
