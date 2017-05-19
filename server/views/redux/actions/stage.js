'use strict'
export const STAGE_SWITCH = 'VISUAL/STAGE_SWITCH';

export const stage_switch = (stage) => ({
    type: STAGE_SWITCH,
    stage
});
