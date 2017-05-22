'use strict'
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Nav from '../Nav';
import DockContent from '../DockContent';
import DockController from '../DockController';
import LogicBlockly from '../LogicBlockly';
import LogicResult from '../LogicResult';
import ObserveRealTimeData from '../ObserveRealTimeData';
import ObserveResult from '../ObserveResult';
import ObserveWorld from '../ObserveWorld';
import styles from './styles.css';

class App extends Component {
    render() {
        return (
            <div className={'container'}>
                <Nav />
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.lefttop}>
                                <div className={styles.dock}>
                                    <DockContent />
                                    <DockController />
                                </div>
                            </div>
                            <div className={styles.leftbottom}>
                                <Switch>
                                    <Route exact path="/" component={LogicBlockly}/>
                                    <Route path="/observe" component={ObserveWorld}/>
                                </Switch>
                            </div>
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
