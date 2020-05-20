// outsource dependencies
import axios from 'axios';

// local dependencies
import { BaseApiResponse } from '../constants/types';

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/?key=16536208-9fc62eea32cdbf6ba7c4bd885&per_page=9&page=1',
});

export const getData = (page: number = 1) => {
    return instance({ method: 'get', url: `&page=${page}` }).then((response) => response.data.hits) as Promise<
        BaseApiResponse
    >;
};
