'use strict'
export const DOCK = 'VISUAL/DOCK';

export const dock = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/dock', false);
    xhr.send('fake');
    const res = JSON.parse(xhr.response);
    const { blocks, XMLDom, code } = res;
    return {
        type: DOCK,
        blocks,
        XMLDom,
        code
    }
};
