// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import app from './app';

function* sagasRoot() {
    yield fork(app);
}

export default sagasRoot;
