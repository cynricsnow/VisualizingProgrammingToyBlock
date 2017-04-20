'use strict'
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Nav from '../Nav';
import DockPage from '../DockPage';
import LogicPage from '../LogicPage';
import ObservePage from '../ObservePage';
import styles from './styles.css';

class App extends Component {
    render() {
        return (
            <div className={'container'}>
                <Nav />
                <div className={styles.content}>
                    <Switch>
                        <Route exact path="/" component={DockPage}/>
                        <Route path="/logic" component={LogicPage}/>
                        <Route path="/observe" component={ObservePage}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
