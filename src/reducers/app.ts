// outsource dependencies
import { Reducer } from 'redux';

// local dependencies
import { StateType } from '../store';
import { DataPayload, TYPES } from '../constants/types';

const initialState: DataPayload = {
    data: [],
    currentPage: 1,
};

export const selector = (state: StateType) => state.app;

const app: Reducer<DataPayload> = (state = initialState, action) => {
    const { type, ...options } = action;

    switch (type) {
        case TYPES.DATA:
            return { ...state, ...options.payload };

        default:
            return state;
    }
};

export default app;
