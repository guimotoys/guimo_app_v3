Blockly.JavaScript['moviment_front'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'f\n,';
  return code;
};

Blockly.JavaScript['moviment_back'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'b\n,';
  return code;
};

Blockly.JavaScript['moviment_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'r\n,';
  return code;
};

Blockly.JavaScript['moviment_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'l\n,';
  return code;
};

Blockly.JavaScript['gole_pocao'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'pocao\n,';
  return code;
};

Blockly.JavaScript['bater_coracao'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'coracao\n,';
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

Blockly.JavaScript['guimo_repeat_m1'] = function(block) {
  var dropdown_times = block.getFieldValue('times_m1');
  var statements_repeat = Blockly.JavaScript.statementToCode(block, 'repeat_m1');
  var branch = Blockly.JavaScript.statementToCode(block, 'repeat_m1');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  // TODO: Assemble JavaScript into code variable.
  var code = branch;
  code += dropdown_times+",";
   // console.log(statements_repeat);
  
  //code += branch; 
  return code;
};

Blockly.JavaScript['trocar_cara'] = function(block) {
  var dropdown_trocar_cara = block.getFieldValue('trocar_cara');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_trocar_cara+'\n,';
  return code;
};
