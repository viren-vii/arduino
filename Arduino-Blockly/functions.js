function auto_save_and_restore_blocks()
{
  window.setTimeout(restore_blocks, 0);
  bindEvent(window, 'unload', backup_blocks);
//  tabClick(selected);

  // Init load event.
  var loadInput = document.getElementById('load');
  loadInput.addEventListener('change', load, false);
  document.getElementById('fakeload').onclick = function() {
    loadInput.click();
  };
}

function restore_blocks() 
{
  if ('localStorage' in window && window.localStorage.arduino) {
    var xml = Blockly.Xml.textToDom(window.localStorage.arduino);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
}

function bindEvent(element, name, func) 
{
  if (element.addEventListener) {  // W3C
    element.addEventListener(name, func, false);
  } else if (element.attachEvent) {  // IE
    element.attachEvent('on' + name, func);
  }
}

function backup_blocks() 
{
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    window.localStorage.setItem('arduino', Blockly.Xml.domToText(xml));
  }
}

function discard()
{
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 || window.confirm('Delete all ' + count + ' blocks?')) {
    Blockly.mainWorkspace.clear();
//    renderContent();
  }
}

function save() 
{
  var fileName = window.prompt('What would you like to name your file?', 'Robo_Monkee');
  // Store data in blob.
  // var builder = new BlobBuilder();
  // builder.append(data);
  // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
  if(fileName){
      var code = createCode();
    var blob = new Blob([code], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, fileName + ".ino");
      document.getElementById("sideBar").classList.toggle("active");
  } 
}
        
function uploadClick() 
{
    var code = createCode();
    swal("Ready to upload to Arduino.", code, "warning").then((value) => {
      if (value) {
      swal("Upload Code", "1. By clicling \"Go to Arduino Create\" your code will be copied to clipboard and you will be redirected to Arduino Create.\n\n2. You have to paste the copied code to Arduino Craete's Editor and choose the borad and click \"Upload\".", "success", {button: "Go To Arduino Create"}).then((value) => {
        if(value){
          var dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value = code;
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy);
          window.open("https://create.arduino.cc/editor/", "_blank");
        }
      });
    }
    });
}
function show(){
    document.getElementById("sideBar").classList.toggle("active");
}
function undo(){
    Blockly.mainWorkspace.undo(false);
}
function redo(){
    Blockly.mainWorkspace.undo(true);
}
function showcode(){
//    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    document.getElementById('id01').style.display='block';
    document.getElementById("sideBar").classList.toggle("active");
    var code = createCode();
    document.getElementById("content").innerHTML = code;
    document.getElementById("modal_header").innerHTML = "Click on the button to copy code!";
    return code;
}
function copycode(){
//    document.getElementById('id01').style.display='block';
    document.getElementById("sideBar").classList.toggle("active");
    var code = createCode();
    document.getElementById("content").innerHTML = "";
    var dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value = code;
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy);
    alert("Code has been copied to your clipboard!");
//    var dummy = document.createElement("textarea1");
//    document.body.appendChild(dummy);
////    String code = global + code;
//    dummy.value = global.split('<br>').join('\n') + code.split('<br>').join('\n');
//    dummy.select();
//    document.execCommand("copy");
//    document.body.removeChild(dummy);
    
}

function close(){
    document.getElementById("sideBar").classList.toggle("active");
    alert("a");
}

function createCode(){
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var global = "";
    var functions = "";
    var  setup  = "";
    if(code.search("Line Follower") != -1){
        functions = '\nvoid forward(int speedEN1, int speedEN2)\n{\n\tSerial.print("Forwards Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid left(int speedEN1, int speedEN2)\n{\n\tSerial.print("Left Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\nvoid deg360(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n\t}\n\nvoid reverse(int speedEN1, int speedEN2)\n{\n\tSerial.print("Reverse Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid stop_all(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n';
        
        global = "\n// IR Array\n#define IR1 A1          // Left most IR sensor\n#define IR2 A2          // Left IR sensor\n#define IR3 A3          // Center IR sensor\n#define IR4 A4          // Right IR senor\n#define IR5 A5          // Right most IR sensor\n\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n";
    }
    if(code.search("Wall Follower") != -1){
        functions = '\nvoid forward(int speedEN1, int speedEN2)\n{\n\tSerial.print("Forwards Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid left(int speedEN1, int speedEN2)\n{\n\tSerial.print("Left Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\nvoid deg360(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n\t}\n\nvoid reverse(int speedEN1, int speedEN2)\n{\n\tSerial.print("Reverse Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid stop_all(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n';
        
        functions += "\n\nfloat distance()\n{\n\n\tdigitalWrite(TRIGGER_PIN,LOW);\n\tdelayMicroseconds(2);\n\tdigitalWrite(TRIGGER_PIN,HIGH);\n\tdelayMicroseconds(10);\n\tdigitalWrite(TRIGGER_PIN,LOW);\n\tint dur=pulseIn(ECHO_PIN, HIGH);\n\tfloat c=dur*0.0294/2;\n\treturn c;\n}\n\n";
        
        global = "\n//Ultrasonic Sensor\n#define TRIGGER_PIN 9   // Trigger Pin\n#define ECHO_PIN 10     // Echo Pin\n\n\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n";
    }
    if(code.search("Line Follower") != -1 && code.search("Wall Follower") != -1){
        functions = '\nvoid forward(int speedEN1, int speedEN2)\n{\n\tSerial.print("Forwards Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid left(int speedEN1, int speedEN2)\n{\n\tSerial.print("Left Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\nvoid deg360(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n\t}\n\nvoid reverse(int speedEN1, int speedEN2)\n{\n\tSerial.print("Reverse Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid stop_all(int speedEN1, int speedEN2)\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n';
        
        functions += "\n\nfloat distance()\n{\n\n\tdigitalWrite(TRIGGER_PIN,LOW);\n\tdelayMicroseconds(2);\n\tdigitalWrite(TRIGGER_PIN,HIGH);\n\tdelayMicroseconds(10);\n\tdigitalWrite(TRIGGER_PIN,LOW);\n\tint dur=pulseIn(ECHO_PIN, HIGH);\n\tfloat c=dur*0.0294/2;\n\treturn c;\n}\n\n";
        
        global = "\n// IR Array\n#define IR1 A1          // Left most IR sensor\n#define IR2 A2          // Left IR sensor\n#define IR3 A3          // Center IR sensor\n#define IR4 A4          // Right IR senor\n#define IR5 A5          // Right most IR sensor\n\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n";
        
        global += "\n//Ultrasonic Sensor\n#define TRIGGER_PIN 9   // Trigger Pin\n#define ECHO_PIN 10     // Echo Pin\n\n";
    }
    if(code.search("//REMOTE CODE") != -1){
        functions = '\nvoid forward()\n{\n\n\tSerial.print(' + '"Forwards Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\n\nvoid spin_left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid spin_right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid backward()\n{\n\n\tSerial.print(' + '"Reverse Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid stop_all()\n{\n\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n\n\nvoid buzzer()\n{\n\t //Buzzer \n}\n\nvoid led()\n{\n\n\t //LED \n}\n';
        
        global = "\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n\n\n#define speedEN1 150\n#define speedEN2 150\n";
        
        setup = "\n\nvoid setup()\n{\n\tSerial.begin(9600);\n\t// MOTOR AND ENABLES\n\tpinMode (RM1, OUTPUT);\n\tpinMode (RM2, OUTPUT);\n\tpinMode (LM1, OUTPUT);\n\tpinMode (LM2, OUTPUT);\n\tpinMode (EN1, OUTPUT);\n\tpinMode (EN2, OUTPUT);\n\n\t\n}\n";
    }
    if(code.search("//Voice Control Code") != -1){
        functions = '\nvoid forward()\n{\n\n\tSerial.print(' + '"Forwards Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\n\nvoid spin_left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid spin_right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid backward()\n{\n\n\tSerial.print(' + '"Reverse Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid stop_all()\n{\n\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n\n\nvoid buzzer()\n{\n\t //Buzzer \n}\n\nvoid led()\n{\n\n\t //LED \n}\n\nvoid deg360()\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n';
        
        global = "\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n\n\n#define speedEN1 150\n#define speedEN2 150\n";
        
        setup = "\n\nvoid setup()\n{\n\tSerial.begin(9600);\n\t// MOTOR AND ENABLES\n\tpinMode (RM1, OUTPUT);\n\tpinMode (RM2, OUTPUT);\n\tpinMode (LM1, OUTPUT);\n\tpinMode (LM2, OUTPUT);\n\tpinMode (EN1, OUTPUT);\n\tpinMode (EN2, OUTPUT);\n\n\t\n}\n";
    }
    if(code.search("//Arena Code") != -1){
        functions = '\nvoid forward()\n{\n\n\tSerial.print(' + '"Forwards Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\nvoid right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,0);\n\tdigitalWrite(LM1,HIGH);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n}\n\n\nvoid spin_left(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid spin_right(){\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid backward()\n{\n\n\tSerial.print(' + '"Reverse Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,HIGH);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n\n\nvoid stop_all()\n{\n\n\tSerial.print(' + '"Right Triggered"' + ');\n\tdigitalWrite(RM1,LOW);\n\tdigitalWrite(RM2,LOW);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,LOW);\n\tanalogWrite(EN1,0);\n\tanalogWrite(EN2,0);\n}\n\n\n\nvoid buzzer()\n{\n\t //Buzzer \n}\n\nvoid led()\n{\n\n\t //LED \n}\n\nvoid deg360()\n{\n\tSerial.print("Right Triggered");\n\tdigitalWrite(RM1,HIGH);\n\tdigitalWrite(RM2,LOW);\n\tanalogWrite(EN2,speedEN2);\n\tdigitalWrite(LM1,LOW);\n\tdigitalWrite(LM2,HIGH);\n\tanalogWrite(EN1,speedEN1);\n}\n';
        
        global = "\n// Motor Driver\n#define EN2 3           // Enable pin 2\n#define RM1 4           // Front Right Motor\n#define RM2 5           // Rear Right Motor\n#define EN1 6           // Enable pin 1\n#define LM1 7           // Front Left Motor\n#define LM2 8           // Rear Left Motor\n\n\n\n#define speedEN1 150\n#define speedEN2 150\n";
        
        setup = "\n\nvoid setup()\n{\n\tSerial.begin(9600);\n\t// MOTOR AND ENABLES\n\tpinMode (RM1, OUTPUT);\n\tpinMode (RM2, OUTPUT);\n\tpinMode (LM1, OUTPUT);\n\tpinMode (LM2, OUTPUT);\n\tpinMode (EN1, OUTPUT);\n\tpinMode (EN2, OUTPUT);\n\n\t\n}\n";
    }
    return global + functions + setup + code;
}
//function copyToClipboard(element) {
//  var $temp = $("<textarea>");
//  var brRegex = /<br\s*[\/]?>/gi;
//  $("body").append($temp);
//  $temp.val($(element).html().replace(brRegex, "\r\n")).select();
//  document.execCommand("copy");
//  $temp.remove();
//}