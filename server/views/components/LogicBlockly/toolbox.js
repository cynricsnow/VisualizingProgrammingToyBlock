'use strict'
const toolbox = (
    `<xml>
        <category id="catLogic" colour="210" name="逻辑">
            <block type="controls_if"></block>
            <block type="controls_if">
                <mutation else="1"></mutation>
            </block>
            <block type="logic_compare"></block>
        </category>
        <category id="catLoops" colour="120" name="循环">
            <block type="controls_repeat"></block>
            <block type="controls_whileUntil"></block>
        </category>
        <category id="catMath" colour="230" name="数学">
            <block type="math_number"></block>
            <block type="math_arithmetic">
                <value name="A">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="B">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
            </block>
        </category>
        <category id="catText" colour="160" name="文本">
            <block type="text"></block>
        </category>
        <sep></sep>
        <category id="catInput" colour="20" name="输入">
            <block type="input_temperature"></block>
            <block type="input_distance"></block>
        </category>
        <category id="catOutput" colour="260" name="输出">
            <block type="output_forward"></block>
            <block type="output_back"></block>
            <block type="output_clockwiserotate"></block>
            <block type="output_anticlockwiserotate"></block>
            <block type="output_speak">
                <value name="WORDS">
                    <block type="text">
                        <field name="TEXT">你好</field>
                    </block>
                </value>
            </block>
            <block type="output_blink"></block>
        </category>
    </xml>`
);

export default toolbox;
