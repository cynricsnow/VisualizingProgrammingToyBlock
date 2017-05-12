'use strict'
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import moment from 'moment';
moment.locale('zh-CN');

import App from './components/App';
import MobileApp from './components/MobileApp';
import store from './redux/store';
import device from './common/device';

import './styles.css';

const history = createBrowserHistory()

if (device.mobile()) {
    device.handleOrientation();
}

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/observe' component={App} />
                <Route exact path="/mobile" component={MobileApp}/>
            </Switch>
        </Router>
    </Provider>
);

const reactRoot = document.getElementById('react-root');
ReactDOM.render(router, reactRoot);
