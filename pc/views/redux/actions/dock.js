'use strict'
import XMLDomToString from '../../common/XMLDomToString';

export const ASSIMILATE = 'VISUAL/ASSIMILATE';
export const DOCK = 'VISUAL/DOCK';
export const UPDATE = 'VISUAL/UPDATE';
export const SHOW = 'VISUAL/SHOW';
export const HIDE = 'VISUAL/HIDE';

export const assimlate = () => ({
    type: ASSIMILATE
});

export const dock = (src, dest) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!(pattern.test(src) && pattern.test(dest))) {
        return {
            type: 'error'
        };
    }
    const data = JSON.parse($.ajax({
        type: 'POST',
        url: `http://10.111.6.240:8000/dock`,
        async: false,
        data: {
            src,
            dest
        },
        xhrFields: {'Access-Control-Allow-Origin': '*' }
    }).responseText);
    const res = JSON.parse($.ajax({
        type: 'POST',
        url: '/api/dock',
        async: false,
        data: {
            blocks: data.blocks
        }
    }).responseText);
    const { blocks, xml, code } = res;
    return {
        type: DOCK,
        blocks,
        xml,
        code
    };
};

export const update = (XMLDom) => {
    const res = JSON.parse($.ajax({
        type: 'POST',
        url: '/api/update',
        async: false,
        data: {
            xml: XMLDomToString(XMLDom)
        }
    }).responseText);
    const { blocks, code } = res;
    return {
        type: UPDATE,
        blocks,
        XMLDom,
        code
    };
};

export const show = () => ({
    type: SHOW
});

export const hide = () => ({
    type: HIDE
});
