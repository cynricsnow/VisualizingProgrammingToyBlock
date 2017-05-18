'use strict'
export const OBSERVE_GETDATA = 'VISUAL/OBSERVE_GETDATA';

export const observe_getdata = (dispatch, src, dest) => {
    $.ajax({
        type: 'POST',
        url: `http://${src}:8000/get_data`,
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
