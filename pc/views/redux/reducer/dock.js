'use strict'
import { ASSIMILATE, DOCK, UPDATE } from '../actions/dock';

const INITIAL_STATE = {
    blocks: [],
    flag: false
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case ASSIMILATE:
            return {
                ...state,
                flag: !state.flag
            }
        case DOCK:
            return {
                ...state,
                blocks: action.blocks
            };
        case UPDATE:
            return {
                ...state,
                blocks: action.blocks
            };
        default:
            return state;
    }
}

export default reducer;
