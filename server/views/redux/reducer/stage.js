'use strict';
import { STAGE_SWITCH } from '../actions/stage';

const reducer = (state = 0, action = {}) => {
    switch (action.type) {
        case STAGE_SWITCH:
            return action.stage;
        default:
            return state;
    }
};

export default reducer;
