const workspaceBlocks = (
    `<xml id="workspaceBlocks" style="display:none">
      <block type="controls_for" x="60" y="60">
        <field name="VAR">i</field>
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
        <statement name="DO">
          <block type="controls_if">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">i</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">1</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="text_output">
                <value name="TEXT">
                  <block type="text">
                    <field name="TEXT">hello</field>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="controls_if">
                <value name="IF0">
                  <block type="logic_compare">
                    <field name="OP">LT</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">i</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number">
                        <field name="NUM">10</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="text_output">
                    <value name="TEXT">
                      <block type="colour_random"></block>
                    </value>
                  </block>
                </statement>
                <next>
                  <block type="controls_if">
                    <value name="IF0">
                      <block type="logic_compare">
                        <field name="OP">EQ</field>
                        <value name="A">
                          <block type="variables_get">
                            <field name="VAR">i</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number">
                            <field name="NUM">10</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <statement name="DO0">
                      <block type="text_output">
                        <value name="TEXT">
                          <block type="text">
                            <field name="TEXT">world</field>
                          </block>
                        </value>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </xml>`
);

export default workspaceBlocks;
