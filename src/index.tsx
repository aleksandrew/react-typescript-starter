// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

// local dependencies
import App from './pages';
import store from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
