const workspaceBlocks = (
    `<xml>
        <block type="output_speak" x="20" y="20">
            <value name="WORDS">
                <shadow type="text">
                    <field name="TEXT">你好</field>
                </shadow>
            </value>
            <next>
                <block type="controls_if">
                    <mutation else="1"></mutation>
                    <value name="IF0">
                        <block type="logic_compare">
                            <field name="OP">GT</field>
                            <value name="A">
                                <block type="input_temperature"></block>
                            </value>
                            <value name="B">
                                <block type="math_number">
                                    <field name="NUM">30</field>
                                </block>
                            </value>
                        </block>
                    </value>
                    <statement name="DO0">
                        <block type="output_blink">
                            <field name="COLOR">#ff0000</field>
                        </block>
                    </statement>
                    <statement name="ELSE">
                        <block type="output_blink">
                            <field name="COLOR">#33ff33</field>
                        </block>
                    </statement>
                    <next>
                        <block type="controls_repeat_ext">
                            <value name="TIMES">
                                <shadow type="math_number">
                                    <field name="NUM">5</field>
                                </shadow>
                            </value>
                            <statement name="DO">
                                <block type="controls_if">
                                    <mutation else="1"></mutation>
                                    <value name="IF0">
                                        <block type="logic_compare">
                                            <field name="OP">GT</field>
                                            <value name="A">
                                                <block type="input_distance">
                                                </block>
                                            </value>
                                            <value name="B">
                                                <block type="math_number">
                                                    <field name="NUM">50</field>
                                                </block>
                                            </value>
                                        </block>
                                    </value>
                                    <statement name="DO0">
                                        <block type="output_forward">
                                            <field name="DISTANCE">50</field>
                                        </block>
                                    </statement>
                                    <statement name="ELSE">
                                        <block type="output_clockwiserotate">
                                            <field name="ANGLE">90</field>
                                        </block>
                                    </statement>
                                </block>
                            </statement>
                        </block>
                    </next>
                </block>
            </next>
        </block>
    </xml>`
);


export default workspaceBlocks;
