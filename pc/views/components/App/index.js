'use strict'
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Nav from '../Nav';
// import DockPage from '../DockPage';
import DockContent from '../DockContent';
// import LogicPage from '../LogicPage';
import LogicBlockly from '../LogicBlockly';
import LogicResult from '../LogicResult';
// import ObservePage from '../ObservePage';
import ObserveRealTimeData from '../ObserveRealTimeData';
import ObserveResult from '../ObserveResult';
import styles from './styles.css';

class App extends Component {
    render() {
        return (
            <div className={'container'}>
                <Nav />
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <DockContent />
                            <Switch>
                                <Route exact path="/" component={LogicBlockly}/>
                                <Route path="/observe" component={ObserveResult}/>
                            </Switch>
                        </div>
                        <div className={styles.right}>
                            <Switch>
                                <Route exact path="/" component={LogicResult}/>
                                <Route path="/observe" component={ObserveRealTimeData}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
