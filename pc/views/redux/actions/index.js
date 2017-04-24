'use strict'
import data from './workspaceBlocks';

export const DOCK = 'VISUAL/DOCK';
export const LOGIC_INITIAL = 'VISUAL/LOGIC_INITIAL';
export const LOGIC_MODIFY = 'VISUAL/LOGIC_MODIFY';

export const dock = () => ({
    type: DOCK,
    data
});
export const logic_initial = (workspace) => ({
    type: LOGIC_INITIAL,
    workspace
})
export const logic_modify = (data) => ({
    type: LOGIC_MODIFY,
    data
})
