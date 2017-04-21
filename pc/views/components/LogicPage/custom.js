Blockly.Blocks.text_output = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_PRINT_TITLE,
            args0: [{
                type:"input_value",
                name:"TEXT"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
        })
    }
};

Blockly.JavaScript.text_output = function (a) {
    var pattern = /^colour_/;
    if (pattern.test(a.childBlocks_[0].type)) {
        var color = Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE) || "''";
        return "outputAppendChild(createColorDiv("
            + color
            + "+'\\n'));\n";
    }
    return "outputAppendText("
        + (Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE) || "''")
        + "+'\\n');\n";
};
