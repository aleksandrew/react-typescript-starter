// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';

// local dependencies
import sagasRoot from './sagas';
import app from './reducers/app';

const rootReducer = combineReducers({
    app: app,
    form: formReducer,
});

type RootReducerType = typeof rootReducer;

export type StateType = ReturnType<RootReducerType>;

const sagaMiddleware: any = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagasRoot);

export default store;
