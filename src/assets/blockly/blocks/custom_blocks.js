Blockly.Blocks['moviment_front'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Andar para Frente");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Andar para Frente');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['moviment_back'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Andar para Trás");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Andar para Trás');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['moviment_right'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Virar para Direita");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Virar para Direita');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['moviment_left'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Virar para Esquerda");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Virar para Esquerda');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['bater_coracao'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Bater coração");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('Fazer o coracao do Guimo Bater');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['gole_pocao'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Gole de elixir");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('Dar um gole de elixir');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['guimo_repeat'] = {
  init: function() {
    this.appendStatementInput("repeat")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Repita")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "times")
        .appendField(" vez(es)");
    this.setInputsInline(false);
    this.setNextStatement(false, null);
    this.setColour(150);
    this.setTooltip('Repetir de 1 a 5 vezes');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['guimo_repeat_m1'] = {
  init: function() {
    this.appendStatementInput("repeat_m1")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Repita")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"],["3","3"]]), "times_m1")
        .appendField(" vez(es)");
    this.setInputsInline(false);
    this.setNextStatement(false, null);
    this.setColour(150);
    this.setTooltip('Repetir de 1 a 3 vezes');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['trocar_cara'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Trocar rosto para")
        .appendField(new Blockly.FieldDropdown([["padrao","padrao"], ["menina","menina"], ["oculos","oculos"], ["bigode","bigode"]]), "trocar_cara");
    this.setPreviousStatement(true, "String");
    this.setNextStatement(true, "String");
    this.setColour(60);
    this.setTooltip('Trocar o rosto do guimo');
    this.setHelpUrl('');
  }
};



