Blockly.JavaScript['movement_front'] = function(block) {
  var value_foward = Blockly.JavaScript.valueToCode(block, 'foward', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'f\n,';
  return code;
};

Blockly.JavaScript['movement_back'] = function(block) {
  var value_back = Blockly.JavaScript.valueToCode(block, 'back', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'b\n,';
  return code;
};

Blockly.JavaScript['movement_right'] = function(block) {
  var value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'r\n,';
  return code;
};

Blockly.JavaScript['movement_left'] = function(block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'l\n,';
  return code;
};

Blockly.JavaScript['guimo_repeat'] = function(block) {
  var dropdown_times = block.getFieldValue('times');
  var statements_repeat = Blockly.JavaScript.statementToCode(block, 'repeat');
  var branch = Blockly.JavaScript.statementToCode(block, 'repeat');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  // TODO: Assemble JavaScript into code variable.
  var code = branch;
  code += dropdown_times+",";
   // console.log(statements_repeat);
  
  //code += branch; 
  return code;
};