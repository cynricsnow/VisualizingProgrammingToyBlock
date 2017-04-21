'use strict'
const loadXMLString = text => {
    try {
        let XMLDoc = new ActiveXObject('Microsoft.XMLDOM');
        XMLDoc.async = false;
        XMLDoc.loadXML(text);
        return XMLDoc;
    } catch (e) {
        try {
            let parser = new DOMParser();
            let XMLDoc = parser.parseFromString(text, 'text/xml');
            return XMLDoc;
        } catch (e) {
            alert(e);
        }
    }
    return;
}

export default loadXMLString;
