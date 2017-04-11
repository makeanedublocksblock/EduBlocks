Blockly.Blocks['import_edupy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from edupy import *");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Imports the edupy library.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pass");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Pass to the next command');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['df'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("def"), "def")
        .appendField("()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Trigger a define function');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['play'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("play(")
        .appendField(new Blockly.FieldTextInput("0"), "value")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Play a single note');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for")
        .appendField(new Blockly.FieldTextInput("i"), "letter")
        .appendField("in range(")
        .appendField(new Blockly.FieldTextInput("number"), "no")
        .appendField("):");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('');
    this.setHelpUrl('Create a for loop');
  }
};

Blockly.Blocks['sleep1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sleep(")
        .appendField(new Blockly.FieldTextInput("0"), "value")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Play a single note');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['import_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from mcpi import block");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip('Imports the mcpi block library.');
    this.setHelpUrl('http://www.example.com/');
  }
};



Blockly.Blocks['random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import random");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Imports the random library.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['build'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buildPumpkin(")
        .appendField(new Blockly.FieldTextInput("0"), "x")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "y")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['import_math'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import math");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Imports the math library.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['return'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("return math.sqrt((xd*xd) + (yd*yd) + (zd*zd))");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Imports the edupy library.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("import time");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Imports the time library.');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['equalsblock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("0"), "1")
        .appendField("=")
        .appendField(new Blockly.FieldTextInput("0"), "2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['sleep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("time.sleep(")
        .appendField(new Blockly.FieldTextInput(1), "sleepTime")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Wait for a given amount of seconds.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["red", "red"], ["yellow", "yellow"], ["green", "green"], ["blue", "blue"]]), "led_colour")
        .appendField("_led_on()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Turns the chosen LED on.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["red", "red"], ["yellow", "yellow"], ["green", "green"], ["blue", "blue"]]), "led_colour")
        .appendField("_led_off()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Turns the chosen LED off.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['button_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("button_pressed()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('When the button is pressed do:');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['get_reading'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get_reading()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Get the distance between the wall and robot.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("stop()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Stop the motors.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("forward()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Make the robot go forward.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("backward()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Make the robot go backward.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn_left()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Turn the robot left.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn_right()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Turn the robot right.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['line_test'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("line_test()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Test the line sensor.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['all_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("all_on()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Turn all 3 LEDs on.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['while_true'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('while True:');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(336);
    this.setTooltip('Forever loop.');
    this.setHelpUrl('https://t.co/PCZC5EFe4D');
  }
};

Blockly.Blocks['else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('else:');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(false);
    this.setColour(336);
    this.setTooltip('Else statement');
    this.setHelpUrl('https://t.co/PCZC5EFe4D');
  }
};

Blockly.Blocks['if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if")
        .appendField(new Blockly.FieldTextInput("0"), "var")
        .appendField(":");
    this.appendStatementInput("DO")
        .appendField("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true);
    this.setColour(336);
    this.setTooltip('If Statement.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['elif'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("elif")
        .appendField(new Blockly.FieldTextInput("0"), "var")
        .appendField(":");
    this.appendStatementInput("DO")
        .appendField("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false);
    this.setColour(336);
    this.setTooltip('Elif Statement.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['greater'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("while")
        .appendField(new Blockly.FieldTextInput(""), "1")
        .appendField(">")
        .appendField(new Blockly.FieldTextInput(""), "v")
        .appendField(":");
    this.appendStatementInput("DO")
        .appendField('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['whileout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("while")
        .appendField(new Blockly.FieldTextInput(""), "1")
        .appendField(":");
    this.appendStatementInput("DO")
        .appendField('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['define'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("def ")
        .appendField(new Blockly.FieldTextInput(""), "1")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput(""), "2")
        .appendField("):");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336)
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['liveloop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("live_loop_")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"]]), "num");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Create a live loop with Sonic Pi');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['all_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("all_off()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Turn all 3 LEDs off.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['all_blink'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("all_blink()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Make all 3 LEDs blink.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("button_test()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Print the button status.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['buzzer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buzzer_")
        .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "NAME")
        .appendField("()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Turns the buzzer on or off');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['blink'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["red", "red"], ["yellow", "yellow"], ["green", "green"]]), "NAME")
        .appendField("_led_blink()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Make a chosen LED blink');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['user_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("user_input()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Blink the LED to  a user given amount. Use the output box.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['key_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("key_control()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Control the robot using arrow keys. Use the output box.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['line_follower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("line_follower()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Follow a line.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['avoid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("avoid()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Avoid obstacles.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['2led_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["red", "red"], ["blue", "blue"]]), "led_colour")
        .appendField("_led_on()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Turns the chosen LED on.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['2led_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["red", "red"], ["blue", "blue"]]), "led_colour")
        .appendField("_led_off()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Turns the chosen LED off.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("temperature()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Prints the temperature in °C and °F. Use the output box.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['ldr'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ldr()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Charges up a capacitor using light. Use output box.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['capacitor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("capacitor_drain()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Drain the capacitor.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['motion'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("motion_reading()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Get a reading from the motion sensor.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['crossing'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["green", "green"], ["amber", "amber"], ["red", "red"], ["red amber", "ramber"], ["flash amber", "flamber"], ["beep", "beep"]]), "NAME")
        .appendField("()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Commands to create a traffic light.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['alarm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("alarm()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Create a motion alarm.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dot()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Dot in morse code.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dash'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dash()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Dash in morse code.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['letter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("letter_space()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Letter space in morse code.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['word'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("word_space()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(196);
    this.setTooltip('Word space in morse code.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['sen'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sen_gui()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Use this to run the SEN Corntrol GUI.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mcimport'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from mcpi.minecraft import Minecraft");
    this.setPreviousStatement(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip('Use this to import minecraft.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mccreate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc = Minecraft.create()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
    this.setTooltip('Use this to connect to minecraft. ALWAYS REQUIRED.');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['mcpost'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.postToChat(\"")
        .appendField(new Blockly.FieldTextInput(""), "chat")
        .appendField("\")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to send a message to the Minecraft chat.');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['print'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("print(\"")
        .appendField(new Blockly.FieldTextInput(""), "print")
        .appendField("\")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(336);
    this.setTooltip('Use this to print to the output box.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mcpos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("playerPos = mc.player.getPos()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this set a variable of the players position.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['varprint'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("print(")
        .appendField(new Blockly.FieldTextInput(""), "var")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to print a variable.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['setpos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.player.setPos(")
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "y")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set the players position');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['campos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.camera.setPos(")
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "y")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set the cameras position');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['getblock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("blockType = mc.getBlock(")
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "y")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0, 0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to get a block type.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['setblock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("blockType = mc.setBlock(")
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "z")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "id")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set a block type.');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['mcvar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("x, y, z = mc.player.getPos()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this set a variable of the players position.');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['mctext'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("blockType = mc.setBlock(")
        .appendField(new Blockly.FieldTextInput("x"), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("y"), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("z"), "z")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "id")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set a block type with text');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mctext2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.setBlock(")
        .appendField(new Blockly.FieldTextInput("x"), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("y"), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("z"), "z")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("i"), "i")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set a block type with text');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mctext5'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.setBlock(")
        .appendField(new Blockly.FieldTextInput("x"), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("y"), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("z"), "z")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("p"), "p")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput("i"), "i")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set a block type with text');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mcblocks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.setBlocks(")
        .appendField(new Blockly.FieldTextInput(0, 0), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "z")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "q")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "w")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "e")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "r")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "t")
        .appendField(", ")
        .appendField(new Blockly.FieldTextInput(0), "y")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Use this to set numerous blocks');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['mcblocks8'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.setBlocks(")
        .appendField(new Blockly.FieldTextInput("0"), "x")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "y")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "z")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "q")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "w")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "e")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "r")
        .appendField(",")
        .appendField(new Blockly.FieldTextInput("0"), "t")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['2buzzer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buzzer_")
        .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "NAME")
        .appendField("()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('Turns the buzzer on or off');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['buildpumpkin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buildPumpkin(")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['getdist'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("distance_to_player(")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['find'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("findObject(")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "y")
        .appendField(", ")
        .appendField(new Blockly.FieldNumber(0), "z")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['import_emine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from eduminecraft import *");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Imports the eduminecraft library.');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['cameraset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mc.camera.set")
        .appendField(new Blockly.FieldDropdown([["Fixed","Fixed"], ["Normal","Normal"]]), "drop")
        .appendField("()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Set camera mode.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['import_sonic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from psonic import *");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['sampleson'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sample(")
        .appendField(new Blockly.FieldTextInput("name"), "name")
        .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['senseshow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sense.show_message(\"")
        .appendField(new Blockly.FieldTextInput("Text Here"), "text")
        .appendField("\")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Imports the Sense Hat library');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['senseinit'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sense = SenseHat()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('Detects the sense hat');
    this.setHelpUrl('');
  }
};



