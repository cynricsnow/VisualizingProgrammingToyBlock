'use strict'
import XMLDomToString from '../../common/XMLDomToString';

export const ASSIMILATE = 'VISUAL/ASSIMILATE';
export const DOCK = 'VISUAL/DOCK';
export const UPDATE = 'VISUAL/UPDATE';

export const assimlate = () => {
    return {
        type: ASSIMILATE
    }
}

export const dock = () => {
    const res = JSON.parse($.ajax({
        type: 'POST',
        url: '/api/dock',
        async: false,
        data: {
            ip: 'fake'
        }
    }).responseText);
    const { blocks, xml, code } = res;
    return {
        type: DOCK,
        blocks,
        xml,
        code
    }
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
    }
};
