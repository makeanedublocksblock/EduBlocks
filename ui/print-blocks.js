global.Blockly = {
  Blocks: {},
  FieldTextInput: function() {},
  FieldDropdown: function() {},
  FieldNumber: function() {}
};

global.Blockly.FieldTextInput.prototype.toString = function() {
  return "Text field";
};

global.Blockly.FieldDropdown.prototype.toString = function() {
  return "Drop down field";
};

global.Blockly.FieldNumber.prototype.toString = function() {
  return "Number field";
};

require("./block_definitions.js");

// console.log(global.Blockly);

Object.keys(global.Blockly.Blocks).forEach(blockName => {
  const blockDef = global.Blockly.Blocks[blockName];

  const info = {
    name: blockName,
    description: "",
    inputs: []
  };

  const builder = {
    appendDummyInput() {
      // console.log("appendDummyInput", arguments);
      return builder;
    },
    appendField(name) {
      // console.log("appendField", arguments);
      info.inputs.push(name);
      return builder;
    },
    setPreviousStatement() {
      // console.log("setPreviousStatement", arguments);
      return builder;
    },
    setNextStatement() {
      // console.log("setNextStatement", arguments);
      return builder;
    },
    setColour() {
      // console.log("setColour", arguments);
      return builder;
    },
    setTooltip(tooltip) {
      // console.log("setTooltip", arguments);
      info.description = tooltip;
      return builder;
    },
    setHelpUrl() {
      // console.log("setHelpUrl", arguments);
      return builder;
    },
    appendStatementInput() {
      // console.log("appendStatementInput", arguments);
      return builder;
    },
    setCheck() {
      // console.log("setCheck", arguments);
      return builder;
    }
  };

  blockDef.init.call(builder);

  console.log(`Block '${info.name}'`);

  if (info.description) {
    console.log(`  Description:`);
    console.log(`    ${info.description}`);
    console.log();
  }

  if (info.inputs.length) {
    console.log("  Fields:");

    info.inputs.forEach(input => {
      console.log(`    ${input.toString()}`);
    });
  }

  console.log();
});
