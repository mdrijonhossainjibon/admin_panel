import { CommonError } from 'modules';
import {
	RANGER_CONNECT_DATA,
	RANGER_CONNECT_ERROR,
	RANGER_CONNECT_FETCH,
	RANGER_DIRECT_WRITE,
	RANGER_DISCONNECT_DATA,
	RANGER_DISCONNECT_FETCH,
	RANGER_SUBSCRIPTIONS_DATA,
	 
} from './constants';

export interface RangerConnectFetch {
	type: typeof RANGER_CONNECT_FETCH;
	payload: {
		withAuth: boolean;
	};
}

export interface RangerConnectData {
	type: typeof RANGER_CONNECT_DATA;
}

export interface RangerDisconnectFetch {
	type: typeof RANGER_DISCONNECT_FETCH;
}

export interface RangerDisconnectData {
	type: typeof RANGER_DISCONNECT_DATA;
}

export interface RangerSubscribe {
	type: typeof RANGER_DIRECT_WRITE;
	payload: {
		channels: string[];
	};
}

export interface RangerDirectMessage {
	type: typeof RANGER_DIRECT_WRITE;
	// tslint:disable-next-line no-any
	payload: { [pair: string]: any };
}

export interface RangerConnectError {
	type: typeof RANGER_CONNECT_ERROR;
	payload?: {
		code: number;
		message: string[];
	};
}

export interface SubscriptionsUpdate {
	type: typeof RANGER_SUBSCRIPTIONS_DATA;
	payload: {
		subscriptions: string[];
	};
}


export type RangerAction = | RangerConnectFetch | RangerConnectData 	| RangerConnectError | RangerDisconnectData | SubscriptionsUpdate;




export type RangerErrorType = typeof RANGER_CONNECT_ERROR;

export const rangerConnectFetch = (payload: RangerConnectFetch['payload']): RangerConnectFetch => ({
	type: RANGER_CONNECT_FETCH,
	payload,
});

export const rangerConnectData = (): RangerConnectData => ({
	type: RANGER_CONNECT_DATA,
});

export const rangerConnectError = (payload: CommonError): RangerConnectError => ({
	type: RANGER_CONNECT_ERROR,
	payload,
});

export const rangerDisconnectData = (): RangerDisconnectData => ({
	type: RANGER_DISCONNECT_DATA,
});

export const rangerDirectMessage = (payload: RangerDirectMessage['payload']): RangerDirectMessage => ({
	type: RANGER_DIRECT_WRITE,
	payload,
});

export const rangerSubscribe = (payload: RangerSubscribe['payload']): RangerDirectMessage => ({
	type: RANGER_DIRECT_WRITE,
	payload: { event: 'subscribe', streams: payload.channels },
});
 

export const rangerUnsubscribe = (payload: RangerSubscribe['payload']): RangerDirectMessage => ({
	type: RANGER_DIRECT_WRITE,
	payload: { event: 'unsubscribe', streams: payload.channels },
});


export const rangerDisconnectFetch = (): RangerDisconnectFetch => ({
	type: RANGER_DISCONNECT_FETCH,
});