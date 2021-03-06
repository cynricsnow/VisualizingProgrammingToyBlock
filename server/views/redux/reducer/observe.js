'use strict'
import { DOCK, UPDATE } from '../actions/dock';
import { OBSERVE_GETDATA, OBSERVE_SWITCH } from '../actions/observe';

const INITIAL_STATE = {
    dimension: false,
    realTimeData: [],
    code: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case DOCK:
            return {
                ...state,
                realTimeData: action.inputs,
                code: action.code
            };
        case UPDATE:
            return {
                ...state,
                code: action.code
            };
        case OBSERVE_GETDATA:
            return {
                ...state,
                realTimeData: action.data
            };
        case OBSERVE_SWITCH:
            return {
                ...state,
                dimension: action.dimension
            }
        default:
            return state;
    }
}

export default reducer;
