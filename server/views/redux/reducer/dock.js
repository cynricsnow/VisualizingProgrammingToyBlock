'use strict'
import { ASSIMILATE, DOCK, UPDATE, SHOW, HIDE } from '../actions/dock';

const INITIAL_STATE = {
    blocks: [],
    flag: false,
    hide: false,
    src: '',
    dest: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case ASSIMILATE:
            return {
                ...state,
                flag: !state.flag
            };
        case DOCK:
            return {
                ...state,
                blocks: action.blocks,
                src: action.src,
                dest: action.dest
            };
        case UPDATE:
            return {
                ...state,
                blocks: action.blocks
            };
        case SHOW:
            return {
                ...state,
                hide: false
            };
        case HIDE:
            return {
                ...state,
                hide: true
            };
        default:
            return state;
    }
}

export default reducer;
