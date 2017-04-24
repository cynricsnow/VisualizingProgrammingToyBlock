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
            <block type="controls_repeat_ext">
                <value name="TIMES">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
                <value name="BY">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
        </category>
        <category id="catMath" colour="230" name="数学">
            <block type="math_number"></block>
            <block type="math_arithmetic">
                <value name="A">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="B">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="math_trig">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">45</field>
                    </shadow>
                </value>
            </block>
            <block type="math_constant"></block>
            <block type="math_number_property">
                <value name="NUMBER_TO_CHECK">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="math_round"></block>
        </category>
        <category id="catText" colour="160" name="文本">
            <block type="text"></block>
        </category>
        <sep></sep>
        <category id="catVariables" colour="330" custom="VARIABLE" name="变量"></category>
        <sep></sep>
        <category id="catInput" colour="20" name="输入">
            <block type="input_temperature"></block>
            <block type="input_distance"></block>
        </category>
        <category id="catOutput" colour="260" name="输出">
            <block type="output_forward"></block>
            <block type="output_back"></block>
            <block type="output_clockwiseroate"></block>
            <block type="output_anticlockwiseroate"></block>
            <block type="output_speak">
                <value name="WORDS">
                    <shadow type="text">
                        <field name="TEXT">你好</field>
                    </shadow>
                </value>
            </block>
            <block type="output_blink"></block>
        </category>
    </xml>`
);

export default toolbox;
