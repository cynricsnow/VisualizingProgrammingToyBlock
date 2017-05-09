'use strict'
export const OBSERVE_GETDATA = 'VISUAL/OBSERVE_GETDATA';

export const observe_getdata = (type) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/${type}`, false);
    xhr.send(null);
    const data = +JSON.parse(xhr.response);
    return {
        type: OBSERVE_GETDATA,
        data
    }
};
