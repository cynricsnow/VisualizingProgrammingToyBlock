'use strict'
export const LOGIC_INITIAL = 'VISUAL/LOGIC_INITIAL';
export const LOGIC_MODIFY = 'VISUAL/LOGIC_MODIFY';

export const logic_initial = (workspace) => ({
    type: LOGIC_INITIAL,
    workspace
});
export const logic_modify = (XMLDom) => ({
    type: LOGIC_MODIFY,
    XMLDom
});
