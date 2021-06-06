var value_left = -1;
var value_right = -1;

Blockly.JavaScript['ir_array'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  var dropdown_logic_ls4 = block.getFieldValue('Logic_LS4');
  var dropdown_value_ls3 = block.getFieldValue('Value_LS3');
  var dropdown_logic_ls3 = block.getFieldValue('Logic_LS3');
  var dropdown_value_ls2 = block.getFieldValue('Value_LS2');
  var dropdown_logic_ls2 = block.getFieldValue('Logic_LS2');
  var dropdown_value_ls1 = block.getFieldValue('Value_LS1');
  var dropdown_logic_ls1 = block.getFieldValue('Logic_LS1');
  var dropdown_value_rs1 = block.getFieldValue('Value_RS1');
  var dropdown_logic_rs1 = block.getFieldValue('Logic_RS1');
  var dropdown_value_rs2 = block.getFieldValue('Value_RS2');
  var dropdown_logic_rs2 = block.getFieldValue('Logic_RS2');
  var dropdown_value_rs3 = block.getFieldValue('Value_RS3');
  var dropdown_logic_rs3 = block.getFieldValue('Logic_RS3');
  var dropdown_value_rs4 = block.getFieldValue('Value_RS4');
  var statements_move = Blockly.JavaScript.statementToCode(block, 'move');
  // TODO: Assemble JavaScript into code variable.
  var code = '\n\tif(digitalRead(LS4) == ' + dropdown_value_ls4 + " && digitalRead(LS3) == " + dropdown_value_ls3 + " && digitalRead(LS2) == " +  dropdown_value_ls2 + " && digitalRead(LS2) == " + dropdown_value_ls1 + " && digitalRead(RS1) == " + dropdown_value_rs1 + " && digitalRead(RS2) == " + dropdown_value_rs2 + " && digitalRead(RS3) == " +  dropdown_value_rs3 + " && digitalRead(RS4) == " + dropdown_value_rs4 + ")\n\t{\n\t" + statements_move + "\n\t}\n";
  return code;
};

Blockly.JavaScript['move'] = function(block) {
  var dropdown_move_dropdown = block.getFieldValue('move_dropdown');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
    if(dropdown_move_dropdown == "left"){
        code = "\tleft"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "right"){
        code = "\tright"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "forward"){
        code = "\tforward"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "reverse"){
        code = "t\reverse"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "deg360"){
        code = "\tdeg360"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "stop"){
        code = "\tstop_all"+ value_speed + ";\n";
    }
  return code;
};

Blockly.JavaScript['delay'] = function(block) {
  var text_delay = block.getFieldValue('delay');
  // TODO: Assemble JavaScript into code variable.
  var code = "\tdelay(" + parseInt(text_delay) * 1000 + ");           // Delay in MilliSeconds\n";
  return code;
};

Blockly.JavaScript['arduino'] = function(block) {
  var statements_setup = Blockly.JavaScript.statementToCode(block, 'setup');
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
  // TODO: Assemble JavaScript into code variable.
  var code = "void setup()\n{\n\tSerial.begin(9600);\n" + statements_setup + "\n}\nvoid loop()\n{\n" + statements_loop + "\n}\n";
  return code;
};

Blockly.JavaScript['line'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\t//Line Follower\n\t// MOTOR AND ENABLES\n\tpinMode (RM1, OUTPUT);\n\tpinMode (RM2, OUTPUT);\n\tpinMode (LM1, OUTPUT);\n\tpinMode (LM2, OUTPUT);\n\tpinMode (EN1, OUTPUT);\n\tpinMode (EN2, OUTPUT);\n\t// IR ARRAY\n\tpinMode (IR1, INPUT);\n\tpinMode (IR2, INPUT);\n\tpinMode (IR3, INPUT);\n\tpinMode (IR4, INPUT);\n\tpinMode (IR5, INPUT);\n";
  return code;
};

Blockly.JavaScript['wall'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\t//Wall Follower\n\t// MOTOR AND ENABLES\n\tpinMode (RM1, OUTPUT);\n\tpinMode (RM2, OUTPUT);\n\tpinMode (LM1, OUTPUT);\n\tpinMode (LM2, OUTPUT);\n\tpinMode (EN1, OUTPUT);\n\tpinMode (EN2, OUTPUT);\n\n\t// ULTRASONIC SENSOR\n\tpinMode(ECHO_PIN,INPUT);\n\tpinMode(TRIGGER_PIN,OUTPUT);\n\t";
  return code;
};

Blockly.JavaScript['distance'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "distance()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['en'] = function(block) {
  var value_right_moto_speed = Blockly.JavaScript.valueToCode(block, 'right_moto_speed', Blockly.JavaScript.ORDER_ATOMIC);
  var value_left_motor_speed = Blockly.JavaScript.valueToCode(block, 'left_motor_speed', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
    if(value_left != -1){
        value_left_motor_speed = value_left;
    }
    if(value_left != -1){
        value_right_moto_speed = value_right;
    }
  var code = value_left_motor_speed + ", " + value_right_moto_speed;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['comment'] = function(block) {
  var text_comment = block.getFieldValue('comment');
  // TODO: Assemble JavaScript into code variable.
  var code = "\t// " + text_comment + "\n";
  return code;
};

Blockly.JavaScript['print'] = function(block) {
  var text_print = block.getFieldValue('print');
  // TODO: Assemble JavaScript into code variable.
  var code = '\tSerial.println("' + text_print + '");\n';
  return code;
};

Blockly.JavaScript['s1'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  // TODO: Assemble JavaScript into code variable.
  var code = "digitalRead(IR1) == "  + dropdown_value_ls4;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['s2'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  // TODO: Assemble JavaScript into code variable.
  var code = "digitalRead(IR2) == "  + dropdown_value_ls4;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['s3'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  // TODO: Assemble JavaScript into code variable.
  var code = "digitalRead(IR3) == "  + dropdown_value_ls4;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['s4'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  // TODO: Assemble JavaScript into code variable.
  var code = "digitalRead(IR4) == "  + dropdown_value_ls4;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['s5'] = function(block) {
  var dropdown_value_ls4 = block.getFieldValue('Value_LS4');
  // TODO: Assemble JavaScript into code variable.
  var code = "digitalRead(IR5) == "  + dropdown_value_ls4;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['ir1'] = function(block) {
  var value_s1 = Blockly.JavaScript.valueToCode(block, 'S1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s5 = Blockly.JavaScript.valueToCode(block, 'S5', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
    if(value_s1 != ""){
        code += value_s1 + " && ";
    }
    if(value_s2 != ""){
        code += value_s2 + " && ";
    }
    if(value_s3 != ""){
        code += value_s3 + " && ";
    }
    if(value_s4 != ""){
        code += value_s4 + " && ";
    }
    if(value_s5 != ""){
        code += value_s5;
    }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['ir2'] = function(block) {
  var value_s2 = Blockly.JavaScript.valueToCode(block, 'S2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s3 = Blockly.JavaScript.valueToCode(block, 'S3', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s4 = Blockly.JavaScript.valueToCode(block, 'S4', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
    if(value_s2 != ""){
        code += value_s2 + " && ";
    }
    if(value_s3 != ""){
        code += value_s3 + " && ";
    }
    if(value_s4 != ""){
        code += value_s4;
    }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['remote'] = function(block) {
  var value_button_set_1 = Blockly.JavaScript.valueToCode(block, 'button_set_1', Blockly.JavaScript.ORDER_NONE);
  var value_button_set_2 = Blockly.JavaScript.valueToCode(block, 'button_set_2', Blockly.JavaScript.ORDER_NONE);
  // TODO: Assemble JavaScript into code variable.
  var code = "\nvoid loop()\n{\n\tString message;\n\tif(Serial.available() > 0)\n\t{\n\t// Checks whether data is comming from the serial port\n\t\tmessage = Serial.read(); // Reads the data from the serial port\n\t}\n\t//REMOTE CODE" + value_button_set_1 + value_button_set_2 + "\n \n\tif(message != 'button_1' && message != 'button_2' && message != 'button_3' && message != 'button_4' && message != 'button_5' && message != 'button_6' && message != 'button_7' && message != 'button_8')\n\t{\n\t\tstop_all();\n\t}\n\n}\n";
  return code;
};

Blockly.JavaScript['_1'] = function(block) {
  var value_set1 = Blockly.JavaScript.valueToCode(block, 'set1', Blockly.JavaScript.ORDER_NONE);
  var value_set2 = Blockly.JavaScript.valueToCode(block, 'set2', Blockly.JavaScript.ORDER_NONE);
  var value_set3 = Blockly.JavaScript.valueToCode(block, 'set3', Blockly.JavaScript.ORDER_NONE);
  // TODO: Assemble JavaScript into code variable.
  var code = value_set1 + value_set2 + value_set3;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['button_vertical_slot'] = function(block) {
  var value_button_set_1 = Blockly.JavaScript.valueToCode(block, 'button_set_1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_button_set_2 = Blockly.JavaScript.valueToCode(block, 'button_set_2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_button_set_3 = Blockly.JavaScript.valueToCode(block, 'button_set_3', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_button_set_1 + value_button_set_2 + value_button_set_3;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['button_horizontal_slot_1'] = function(block) {
  var value_button_set_1 = Blockly.JavaScript.valueToCode(block, 'button_set_1', Blockly.JavaScript.ORDER_NONE);
  var value_button_set_2 = Blockly.JavaScript.valueToCode(block, 'button_set_2', Blockly.JavaScript.ORDER_NONE);
  // TODO: Assemble JavaScript into code variable.
  var code = value_button_set_1 + value_button_set_2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['button_horizontal_slot_2'] = function(block) {
  var value_button_set_3 = Blockly.JavaScript.valueToCode(block, 'button_set_3', Blockly.JavaScript.ORDER_NONE);
  // TODO: Assemble JavaScript into code variable.
  var code = value_button_set_3;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_1'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_1')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_2'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_2')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_3'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_3')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_4'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_4')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_5'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_5')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_6'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_6')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_7'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_7')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['remote_option_8'] = function(block) {
  var dropdown_options_dropdown = block.getFieldValue('options_dropdown');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\tif(message == 'button_8')\n\t{\n\t\t" + dropdown_options_dropdown + ";\n\t}\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_COMMA];
};

Blockly.JavaScript['move_line_follower'] = function(block) {
  var dropdown_move_dropdown = block.getFieldValue('move_dropdown');
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
    if(dropdown_move_dropdown == "left"){
        code = "\tleft"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "right"){
        code = "\tright"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "forward"){
        code = "\tforward"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "reverse"){
        code = "t\reverse"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "deg360"){
        code = "\tdeg360"+ value_speed + ";\n";
    }
    if(dropdown_move_dropdown == "stop"){
        code = "\tstop_all"+ value_speed + ";\n";
    }
  return code;
  return code;
};

Blockly.JavaScript['start'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = "\nvoid loop()\n{\n\t//Arena Code" + statements_name + "\n}";
  return code;
};

Blockly.JavaScript['move_hard_code'] = function(block) {
  var dropdown_move_dropdown = block.getFieldValue('move_dropdown');
  var number_delay = block.getFieldValue('delay');
  // TODO: Assemble JavaScript into code variable.
    if(dropdown_move_dropdown == "stop"){
        dropdown_move_dropdown = "stop_all";
    }
  var code = "\n\t" + dropdown_move_dropdown + "();\n\tdelay(" + number_delay + ");";
  return code;
};

Blockly.JavaScript['led'] = function(block) {
  var dropdown_led_buzzer = block.getFieldValue('led_buzzer');
  var number_delay = block.getFieldValue('delay');
  // TODO: Assemble JavaScript into code variable.
  var code = "\n\t" + dropdown_led_buzzer + "();\n\tdelay(" + number_delay + ");";
  return code;
};

Blockly.JavaScript['voice'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_move_dropdown = block.getFieldValue('move_dropdown');
  // TODO: Assemble JavaScript into code variable.
    if(dropdown_move_dropdown == "stop"){
        dropdown_move_dropdown = "stop_all";
    }
  var code = '\n\tif(message == "' + text_name + '")\n\t{\n\t\t' + dropdown_move_dropdown + '();' + '\n\t}\n';
  return code;
};

Blockly.JavaScript['set_command'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = "\nvoid loop()\n{\n\t//Voice Control Code\n" + "\n\tString message;\n\tif(Serial.available() > 0)\n\t{\n\t\t// Checks whether data is comming from the serial port\n\t\tmessage = Serial.read();   // Reads the data from the serial port\n\t}\n" + statements_name + "}";
  return code;
};

Blockly.JavaScript['_150'] = function(block) {
  var number_name = block.getFieldValue('NAME');
//    block.setFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = number_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['_0'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = number_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['global_speed'] = function(block) {
  value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "" + value_left + " " + value_right;
    console.log(code);
  return code;
};