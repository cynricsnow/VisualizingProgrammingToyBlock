'use strict'
export const OBSERVE_GETDATA = 'VISUAL/OBSERVE_GETDATA';
export const OBSERVE_SWITCH = 'VISUAL/OBSERVE_SWITCH';

export const observe_getdata = (dispatch, dest) => {
    $.ajax({
        type: 'POST',
        url: `http://${dest}:8000/get_data`,
        timeout: 1000,
        data: {
            dest
        },
        xhrFields: {'Access-Control-Allow-Origin': '*' }
    }).success(data => {
        dispatch({
            type: OBSERVE_GETDATA,
            data
        });
    }).fail((jqXHR, textStatus) => {
        if (textStatus == 'timeout') {
            alert('对接超时');
        }
    });
};

export const observe_switch = (dimension) => ({
    type: OBSERVE_SWITCH,
    dimension
});
