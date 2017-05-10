'use strict'
import * as dock from '../actions/dock';
import * as observe from '../actions/observe';

const INITIAL_STATE = {
    realTimeData: [],
    code: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case dock.DOCK:
            return {
                ...state,
                realTimeData: [{type:'温度', value: 30}, {type: '超声波', value: 40}],
                code: action.code
            };
        case dock.UPDATE:
            return {
                ...state,
                code: action.code
            }
        case observe.OBSERVE_GETDATA:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;
