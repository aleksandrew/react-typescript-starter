// outsource dependencies
import { action } from 'typesafe-actions';

// local dependencies
import { Hits, TYPES } from '../constants/types';

export const DATA = (data: Hits[], currentPage: number = 1) => action(TYPES.DATA, { data, currentPage });

export const getData = (page: number | never) => action(TYPES.GET_DATA, { page });
