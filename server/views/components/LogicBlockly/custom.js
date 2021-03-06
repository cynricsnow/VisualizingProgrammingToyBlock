Blockly.Msg.INPUT_TEMPERATUE_TITLE = '温度传感器(℃)';
Blockly.Msg.INPUT_TEMPERATUE_TOOLTIP = '模拟温度传感器数据';
Blockly.Msg.INPUT_DISTANCE_TITLE = '超声波传感器(cm)';
Blockly.Msg.INPUT_DISTANCE_TOOLTIP = '模拟超声波传感器数据';

Blockly.Msg.OUTPUT_FORWARD_TITLE = '前进 %1 厘米';
Blockly.Msg.OUTPUT_FORWARD_TOOLTIP = '控制机器人向前移动';
Blockly.Msg.OUTPUT_BACK_TITLE = '后退 %1 厘米';
Blockly.Msg.OUTPUT_BACK_TOOLTIP = '控制机器人向后移动';
Blockly.Msg.OUTPUT_CLOCKWISEROTATE_TITLE = '顺时针旋转 %1';
Blockly.Msg.OUTPUT_CLOCKWISEROTATE_TOOLTIP = '控制机器人顺时针旋转';
Blockly.Msg.OUTPUT_ANTICLOCKWISEROTATE_TITLE = '逆时针旋转 %1';
Blockly.Msg.OUTPUT_ANTICLOCKWISEROTATE_TOOLTIP = '控制机器人逆时针旋转';
Blockly.Msg.OUTPUT_SPEAK_TITLE = '说话 %1';
Blockly.Msg.OUTPUT_SPEAK_TOOLTIP = '控制机器人说话';
Blockly.Msg.OUTPUT_BLINK_TITLE = '发光 %1';
Blockly.Msg.OUTPUT_BLINK_TOOLTIP = '控制机器人发光';

Blockly.Blocks.inputs = {};
Blockly.Blocks.inputs.HUE = 20;

Blockly.Blocks.outputs = {};
Blockly.Blocks.outputs.HUE = 260;

Blockly.Blocks.input_temperature = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.INPUT_TEMPERATUE_TITLE,
            output: 'Number',
            colour: Blockly.Blocks.inputs.HUE,
            tooltip: Blockly.Msg.INPUT_TEMPERATUE_TOOLTIP
        })
    }
}

Blockly.JavaScript.input_temperature = block => {
  const code = '(Math.random() * 80 - 30).toFixed(1)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks.input_distance = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.INPUT_DISTANCE_TITLE,
            output: 'Number',
            colour: Blockly.Blocks.inputs.HUE,
            tooltip: Blockly.Msg.INPUT_DISTANCE_TOOLTIP
        })
    }
}

Blockly.JavaScript.input_distance = block => {
  const code = '(Math.random() * 100).toFixed(2)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks.output_forward = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_FORWARD_TITLE,
            args0: [{
                type: 'field_number',
                name: 'DISTANCE',
                value: 10,
                min: 1,
                max: 100
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_FORWARD_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_forward = block => {
  const distance = block.getFieldValue('DISTANCE') || 0;
  const code = 'outputAppendText(' + '"前进 \u2191 " + ' + distance + ' + " 厘米\\n");\n';
  return code;
};

Blockly.Blocks.output_back = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_BACK_TITLE,
            args0: [{
                type: 'field_number',
                name: 'DISTANCE',
                value: 10,
                min: 1,
                max: 100
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_BACK_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_back = block => {
  const distance = block.getFieldValue('DISTANCE') || 0;
  const code = 'outputAppendText(' + '"后退 \u2193 " + ' + distance + ' + " 厘米\\n");\n';
  return code;
};

Blockly.Blocks.output_clockwiserotate = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_CLOCKWISEROTATE_TITLE,
            args0: [{
                type: 'field_dropdown',
                name: 'ANGLE',
                options: [
                    [
                        '90°',
                        '90'
                    ],
                    [
                        '180°',
                        '180'
                    ],
                    [
                        '270°',
                        '270'
                    ],
                    [
                        '360°',
                        '360'
                    ]
                ]
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_CLOCKWISEROTATE_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_clockwiserotate = block => {
  const angle = block.getFieldValue('ANGLE') || 0;
  const code = 'outputAppendText(' + '"顺时针旋转 \u21BB " + ' + angle + ' + " 度\\n");\n';
  return code;
};

Blockly.Blocks.output_anticlockwiserotate = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_ANTICLOCKWISEROTATE_TITLE,
            args0: [{
                type: 'field_dropdown',
                name: 'ANGLE',
                options: [
                    [
                        '90°',
                        '90'
                    ],
                    [
                        '180°',
                        '180'
                    ],
                    [
                        '270°',
                        '270'
                    ],
                    [
                        '360°',
                        '360'
                    ]
                ]
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_ANTICLOCKWISEROTATE_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_anticlockwiserotate = block => {
  const angle = block.getFieldValue('ANGLE') || 0;
  const code = 'outputAppendText(' + '"逆时针旋转 \u21BA " + ' + angle + ' + " 度\\n");\n';
  return code;
};

Blockly.Blocks.output_speak = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_SPEAK_TITLE,
            args0: [{
                type: 'input_value',
                name: 'WORDS'
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_SPEAK_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_speak = block => {
    const words = Blockly.JavaScript.valueToCode(block, 'WORDS', Blockly.JavaScript.ORDER_NONE);
    const code = 'outputAppendText(' + words + ' + "\\n");\n';
    return code;
};

Blockly.Blocks.output_blink = {
    init() {
        this.jsonInit({
            message0: Blockly.Msg.OUTPUT_BLINK_TITLE,
            args0: [{
                type: 'field_colour',
                name: 'COLOR',
                colour: '#ff0000'
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.outputs.HUE,
            tooltip: Blockly.Msg.OUTPUT_BLINK_TOOLTIP
        })
    }
}

Blockly.JavaScript.output_blink = block => {
    const color = block.getFieldValue('COLOR');
    const code = 'outputAppendChild(createColorDiv("' + color + '" + "\\n"));\n';
    return code;
};
