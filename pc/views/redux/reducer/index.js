'use strict'
import * as types from '../actions';
import loadXMLString from '../../common/loadXMLString';

const INITIAL_STATE = {
    dock: null,
    logic: null,
    observe: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.DOCK:
            return {
                ...state,
                dock: action.data,
                logic: loadXMLString(action.data).childNodes[0]
            };
        case types.LOGIC_MODIFY:
            return {
                ...state,
                logic: action.data
            }
        default:
            return state;
    }
}

export default reducer;
