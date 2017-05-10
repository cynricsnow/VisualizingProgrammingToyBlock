'use strict'
const XMLDomToString = XMLDom => {
    if (window.ActiveXObject) {
        return XMLDom.xml;
    } else {
        try {
            const serializer = new XMLSerializer();
            const str = serializer.serializeToString(XMLDom);
            return str;
        } catch (e) {
            alert(e);
        }
    }
    return;
}

export default XMLDomToString;
