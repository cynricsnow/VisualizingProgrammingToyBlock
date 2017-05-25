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

export const dock = (dispatch, src, dest) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!(pattern.test(src) && pattern.test(dest))) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: `http://${src}:8000/dock`,
        timeout: 1000,
        data: {
            dest
        },
        xhrFields: {'Access-Control-Allow-Origin': '*' }
    }).success(data => {
        const res = JSON.parse($.ajax({
            type: 'POST',
            url: '/api/dock',
            async: false,
            data: {
                bytes: data.bytes,
                inputs: data.inputs
            }
        }).responseText);
        const { blocks, xml, code, inputs } = res;
        dispatch({
            type: DOCK,
            blocks,
            xml,
            code,
            src,
            dest,
            inputs
        });
    }).fail((jqXHR, textStatus) => {
        if (textStatus == 'timeout') {
            alert('对接超时');
        }
    });
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
