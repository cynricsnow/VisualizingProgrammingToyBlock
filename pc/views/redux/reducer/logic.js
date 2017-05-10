'use strict'
import StringToXMLDom from '../../common/StringToXMLDom';

import { DOCK, UPDATE } from '../actions/dock';
import { LOGIC_INITIAL, LOGIC_MODIFY } from '../actions/logic';

const INITIAL_STATE = {
    XMLDom: null,
    workspace: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case DOCK:
            return {
                ...state,
                XMLDom: StringToXMLDom(action.xml).childNodes[0],
            };
        case UPDATE:
            return {
                ...state,
                XMLDom: action.XMLDom
            };
        case LOGIC_INITIAL:
            return {
                ...state,
                workspace: action.workspace
            }
        case LOGIC_MODIFY:
            return {
                ...state,
                XMLDom: action.XMLDom
            }
        default:
            return state;
    }
}

export default reducer;
