// outsource dependencies
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

// local dependencies
import Main from './main';
import Loader from '../components/Loader';
import { selector } from '../reducers/app';
import { ROUTES } from '../constants/routes';
import { getData } from '../reducers/action';

export default function App() {
    const { data, currentPage } = useSelector(selector);

    const dispatch = useDispatch();
    const getDataRequest = useCallback((page: number) => dispatch(getData(page)), [dispatch]);

    useEffect(() => {
        if (data.length === 0) {
            getDataRequest(currentPage);
        }
    }, [data, getDataRequest, currentPage]);

    return (
        <>
            {data.length === 0 ? (
                <Loader />
            ) : (
                <Switch>
                    <Route path={ROUTES.MAIN} component={Main} />
                    <Redirect exact from="/" to={ROUTES.MAIN} />
                </Switch>
            )}
        </>
    );
}
