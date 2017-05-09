'use strict'
import * as dock from '../actions/dock';
import * as observe from '../actions/observe';

const INITIAL_STATE = {
    temperatures: [],
    distances: [],
    code: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case dock.DOCK:
            return {
                ...state,
                temperatures: [1],
                distances: [1],
                code: action.code
            };
        case observe.OBSERVE_GETDATA:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;
