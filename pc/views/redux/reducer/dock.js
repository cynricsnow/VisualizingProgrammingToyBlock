'use strict'
import * as dock from '../actions/dock';

const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case dock.DOCK:
            return action.blocks;
        case dock.UPDATE:
            return action.blocks;
        default:
            return state;
    }
}

export default reducer;
