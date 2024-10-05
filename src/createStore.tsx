import { createStore, applyMiddleware, compose, Middleware } from "redux";
import { rootReducer, rootSaga  } from "./modules";

import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

// Cast sagaMiddleware to Middleware
const middleware = sagaMiddleware as Middleware<{}, any, any>;

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(  rootReducer, {} , composeEnhancer(applyMiddleware(middleware)));

 sagaMiddleware.run(rootSaga);
