'use strict'
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import moment from 'moment';
moment.locale('zh-CN');

import App from './components/App';
import store from './redux/store';

import './styles.css';

const history = createBrowserHistory()

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App} />
        </Router>
    </Provider>
);

const reactRoot = document.getElementById('react-root');
ReactDOM.render(router, reactRoot);
