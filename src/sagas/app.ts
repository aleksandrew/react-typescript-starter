// outsource dependencies
import { takeEvery, put, call, select } from 'redux-saga/effects';

// local dependencies
import { getData } from '../services/api';
import { DATA } from '../reducers/action';
import { TYPES } from '../constants/types';

function* getImage({ ...payload }) {
    const { page } = payload.payload;
    const currentData = yield select((state) => state.app.data);

    try {
        const uploadedData = yield call(getData, page);
        const data = currentData.length === 0 ? [...uploadedData] : [...currentData, ...uploadedData];

        yield put(DATA(data, page));
    } catch (e) {
        console.warn(e);
    }
}

export default function* () {
    yield takeEvery(TYPES.GET_DATA, getImage);
}
