'use strict'
import * as dock from '../actions/dock';

const INITIAL_STATE = {
    blocks: [],
    flag: false
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case dock.ASSIMILATE:
            return {
                ...state,
                flag: !state.flag
            }
        case dock.DOCK:
            return {
                ...state,
                blocks: action.blocks
            };
        case dock.UPDATE:
            return {
                ...state,
                blocks: action.blocks
            };
        default:
            return state;
    }
}

export default reducer;
