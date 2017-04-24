'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.png';

class Nav extends Component {
    liIsActive(url) {
        return location.pathname === url ? 'active' : '';
    }
    render() {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-menu'>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link to='/' className='navbar-brand'><img alt='VISUAL' src={logo} />VISUAL</Link>
                    </div>
                    <div className='collapse navbar-collapse' id='navbar-menu'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li className={this.liIsActive('/')}>
                                <Link to='/'>独立模式</Link>
                            </li>
                            <li className={this.liIsActive('/observe')}>
                                <Link to='/observe'>观察模式</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;
