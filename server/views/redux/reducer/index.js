'use strict'
import { combineReducers } from 'redux';

import dock from './dock';
import logic from './logic';
import observe from './observe';
import stage from './stage';

export default combineReducers({
    dock,
    logic,
    observe,
    stage
})
