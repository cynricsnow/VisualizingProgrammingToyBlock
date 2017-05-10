'use strict'
export const OBSERVE_GETDATA = 'VISUAL/OBSERVE_GETDATA';

export const observe_getdata = () => {
    const data = JSON.parse($.ajax({
        type: 'GET',
        url: '/api/get_data',
        async: false
    }).responseText);
    return {
        type: OBSERVE_GETDATA,
        data
    }
};
