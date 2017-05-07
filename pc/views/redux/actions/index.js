'use strict'
import data from './workspaceBlocks';

export const DOCK = 'VISUAL/DOCK';
export const LOGIC_INITIAL = 'VISUAL/LOGIC_INITIAL';
export const LOGIC_MODIFY = 'VISUAL/LOGIC_MODIFY';

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
export const logic_initial = (workspace) => ({
    type: LOGIC_INITIAL,
    workspace
})
export const logic_modify = (data) => ({
    type: LOGIC_MODIFY,
    data
})
