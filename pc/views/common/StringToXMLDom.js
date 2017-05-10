'use strict'
const StringToXMLDom = text => {
    let XMLDom;
    try {
        XMLDom = new ActiveXObject('Microsoft.XMLDOM');
        XMLDom.async = false;
        XMLDom.loadXML(text);
        return XMLDom;
    } catch (e) {
        try {
            const parser = new DOMParser();
            XMLDom = parser.parseFromString(text, 'text/xml');
            return XMLDom;
        } catch (e) {
            alert(e);
        }
    }
    return;
}

export default StringToXMLDom;
