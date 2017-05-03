'use strict'
import * as types from '../actions';
import loadXMLString from '../../common/loadXMLString';

const INITIAL_STATE = {
    dock: null,
    logic: null,
    observe: {
        temperatures: [],
        distances: [],
        code: ''
    },
    workspace: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.DOCK:
            return {
                ...state,
                dock: action.data,
                logic: loadXMLString(action.XMLDom).childNodes[0],
                observe: {
                    temperatures: [1],
                    distances: [1],
                    code: action.code
                }
            };
        case types.LOGIC_INITIAL:
            return {
                ...state,
                workspace: action.workspace
            }
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
