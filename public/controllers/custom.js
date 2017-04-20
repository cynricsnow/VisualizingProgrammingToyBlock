Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};

Blockly.JavaScript['string_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || "''";
      console.log(argument0);
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks.text_output = {
    init: function () {
        this.jsonInit({
            message0:Blockly.Msg.TEXT_PRINT_TITLE,
            args0:[{type:"input_value",name:"TEXT"}],
            previousStatement:null,
            nextStatement:null,
            colour:Blockly.Blocks.texts.HUE,
            tooltip:Blockly.Msg.TEXT_PRINT_TOOLTIP,
            helpUrl:Blockly.Msg.TEXT_PRINT_HELPURL
        })
    }
};

function outputAppendChild(node) {
    return output.appendChild(node);
}

function createColorDiv(color) {
    var div = document.createElement('div');
    div.style.backgroundColor = color;
    return div;
}

function outputAppendText(text) {
    return output.appendChild(document.createTextNode(text));
}

// Blockly.JavaScript.text_output = function (a) {
//     var pattern = /^colour_/;
//     if (pattern.test(a.childBlocks_[0].type)) {
//         var color = Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE) || "''";
//         return "output.appendChild(createColorDiv("
//             + color
//             + "+'\\n'));\n";
//     }
//     return "output.appendChild(document.createTextNode("
//         + (Blockly.JavaScript.valueToCode(a, "TEXT", Blockly.JavaScript.ORDER_NONE) || "''")
//         + "+'\\n'));\n";
// };

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
