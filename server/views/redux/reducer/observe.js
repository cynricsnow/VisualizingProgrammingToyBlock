'use strict'
import { DOCK, UPDATE } from '../actions/dock';
import { OBSERVE_GETDATA } from '../actions/observe';

const INITIAL_STATE = {
    realTimeData: [],
    code: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case DOCK:
            return {
                ...state,
                realTimeData: [{type:'温度', value: ' ? 度'}, {type: '超声波', value: ' ? 厘米'}],
                code: action.code
            };
        case UPDATE:
            return {
                ...state,
                code: action.code
            }
        case OBSERVE_GETDATA:
            return {
                ...state,
                realTimeData: action.data
            }
        default:
            return state;
    }
}

export default reducer;