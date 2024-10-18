import { all, call, cancel, delay, Effect, fork, put, race, take } from "redux-saga/effects";
import { RangerConnectFetch, rangerDisconnectData, rangerDisconnectFetch } from "../action";
import { RANGER_CONNECT_DATA, RANGER_CONNECT_FETCH, RANGER_DIRECT_WRITE, RANGER_DISCONNECT_DATA, RANGER_DISCONNECT_FETCH } from "../constants";
import { generateSocketURI, streamsBuilder } from "../helpers";
import { Channel, eventChannel, Task } from "redux-saga";
import { alertPush, signInFailure, signInSuccess } from "modules";
import { defaultConfig } from "API/confing";

interface RangerBuffer {
    messages: object[];
}

const initRanger = ({ withAuth }: RangerConnectFetch['payload'], prevSubs: string[], buffer: RangerBuffer) => {
    const baseUrl = defaultConfig.api.rangerUrl;
    const streams = streamsBuilder(withAuth, prevSubs);
    const ws = new WebSocket(generateSocketURI(baseUrl, streams));

    const channel = eventChannel((emitter) => {
        ws.onopen = () => {
            emitter({ type: RANGER_CONNECT_DATA });
            while (buffer.messages.length > 0) {
                const message = buffer.messages.shift();
                ws.send(JSON.stringify(message));
            }
        };

        ws.onerror = error => {
           emitter(alertPush({ message : [ `WebSocket error: ${error.type}`  ]}))
            console.log(error)
        };

        ws.onclose = () => {
            emitter(rangerDisconnectData());
        };

        ws.onmessage = ({ data }) => {
            let payload: { [pair: string]: any } = {};

            try {
                payload = JSON.parse(data as string);
            } catch (e: any) {
                window.console.error(`Error parsing : ${e.data}`);
            }




            for (const routingKey in payload) {
                if (payload.hasOwnProperty(routingKey)) {
                    const event = payload[routingKey];

                    if (event === 'login') {
                         
                        if (payload.statusCode === 200) {
                            emitter(signInSuccess(payload.result.user));
                            return;
                        }
                        emitter(signInFailure(payload.message.error))                      
                    }

                     
                }


            }


        };

        return () => {
            ws.close();
        };
    });

    return [channel, ws];
}

function* writer(socket: WebSocket, buffer: RangerBuffer): Generator<Effect, void, unknown> {
    while (true) {
        const { payload }: any = yield take(RANGER_DIRECT_WRITE);
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
        } else {
            buffer.messages.push(payload);
        }
    }
}

function* reader(channel: Channel<any>): Generator<Effect, void, unknown> {
    while (true) {
        const action: any = yield take(channel);
        yield put(action);
    }
}

function* watchDisconnect(socket: WebSocket, channel: Channel<any>) {
    yield take(RANGER_DISCONNECT_FETCH);
    socket.close();
}

function* bindSocket(channel: Channel<any>, socket: WebSocket, buffer: RangerBuffer) {
    yield all([
        call(reader, channel),
        call(writer, socket, buffer),
        call(watchDisconnect, socket, channel)
    ]);
}

export function* rangerSaga(): any {
    let initialized = false;
    let connectFetchPayload: RangerConnectFetch['payload'] | undefined;
    const buffer: RangerBuffer = { messages: [] };
    let pipes: Task | undefined;

    while (true) {
        const { connectFetch, disconnectData } = yield race({
            connectFetch: take(RANGER_CONNECT_FETCH),
            disconnectData: take(RANGER_DISCONNECT_DATA),
        });

        if (connectFetch) {
            if (initialized) {
                yield put(rangerDisconnectFetch());
                yield take(RANGER_DISCONNECT_DATA);
            }
            connectFetchPayload = connectFetch.payload;
        }

        if (disconnectData) {
            yield delay(1000);
        }

        if (connectFetchPayload) {
            const prevSubs: any[] = [];
            const [channel, socket] = yield call(initRanger, connectFetchPayload, prevSubs, buffer);

            if (pipes) {
                yield cancel(pipes);
            }

            initialized = true;
            pipes = yield fork(bindSocket, channel, socket, buffer);
        }
    }
}
