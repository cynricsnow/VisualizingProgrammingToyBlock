'use strict'
import loadXMLString from '../../common/loadXMLString';

import * as dock from '../actions/dock';
import * as logic from '../actions/logic';

const INITIAL_STATE = {
    XMLDom: null,
    workspace: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case dock.DOCK:
            return {
                ...state,
                XMLDom: loadXMLString(action.XMLDom).childNodes[0],
            };
        case logic.LOGIC_INITIAL:
            return {
                ...state,
                workspace: action.workspace
            }
        case logic.LOGIC_MODIFY:
            return {
                ...state,
                XMLDom: action.XMLDom
            }
        default:
            return state;
    }
}

export default reducer;
