var mybutton;
var lineFollowerCheck, ultrasoniceCheck, bluetoothCheck, playgroundCheck;



// document.addEventListener('DOMContentLoaded', (event) => {
//     document.querySelectorAll('pre code').forEach((el) => {
//       hljs.highlightElement(el);
//     });
//   });
var observer;
window.onload = function () {
    addIfBlockRef = document.getElementById("ifBlocks");
    document.getElementById("cover").style.display = "none";
    document.getElementById("loader").style.display = "none";

    addPgBlockRef = document.getElementById("pgCode");
    addVoiceBlockRef = document.getElementById("bluetoothVoiceBlock");

    mybutton = document.getElementById("myBtn");
    //Get the button:

    linefolloweCodeBlock = document.getElementById('line-follower');
    ultrasonicCodeBlock = document.getElementById('ultrasonic');
    bluetoothCodeBlock = document.getElementById('bluetooth');

    lineFollowerCheck = document.getElementById('line-follower-check');
    ultrasoniceCheck = document.getElementById('ultrasonic-check');
    bluetoothCheck = document.getElementById('bluetooth-check');
    playgroundCheck = document.getElementById('playground-check');

    handleOnChange();
    changeArduino();


}
function highlight(){
    hljs.highlightAll();
    console.log("done");
}
var body = document.getElementsByTagName('body')[0];
var idCount = 0;
function addIfBlock() {
    // console.log("in");
    var ifDiv = document.createElement("div");
    idCount += 1;
    ifDiv.id = "if" + idCount;
    ifDiv.innerHTML = createIfBlock(idCount);
    addIfBlockRef.appendChild(ifDiv);
    stringify();

}

var addedIf = {}, addedIfString = "";
// oninput=\"handleOnChange();\" required
// type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\"
/*
<select name=\"functions\" id=\"Fnif"+idCount+"\" oninput=\"handleOnChange();\">
            <option value=\"forward\">forward</option>
            <option value=\"reverse\">reverse</option>
            <option value=\"left\">left</option>
            <option value=\"right\">right</option>
            <option value=\"stop\">stop</option>
</select>
value=\"0\"
*/
function createIfBlock(idCount) {
    //code if
    addedIf[idCount] = `
        if(S1 ==  and S2 ==  and S3 ==  and S4 ==  and S5 == ){
		    ();
	}`;

    return [
        "\
    if(S1 == <input class=\"SS\" id=\"S1if"+ idCount + "\" value=\"0\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S2 == <input class=\"SS\" id=\"S2if" + idCount + "\" value=\"0\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S3 == <input class=\"SS\" id=\"S3if" + idCount + "\" value=\"0\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S4 == <input class=\"SS\" id=\"S4if" + idCount + "\" value=\"0\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S5 == <input class=\"SS\" id=\"S5if" + idCount + "\" value=\"0\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/>){<br>\
        <select name=\"functions\" id=\"Fnif"+ idCount + "\" oninput=\"checkIfValues();\">\
            <option value=\"forward\" selected>forward</option>\
            <option value=\"reverse\">reverse</option>\
            <option value=\"left\">left</option>\
            <option value=\"right\">right</option>\
            <option value=\"stop\">stop</option>\
        </select>();<br>\
    }<button type=\"button\" id=\"delBtn"+ idCount + "\"onclick=\"deleteIfBlock(this);\">-</button>"
    ].join('\n');
}
function deleteIfBlock(e) {
    id = e.getAttribute("id");
    id = id.split("n").pop();
    delDiv = document.getElementById("if" + id);
    delDiv.remove();

    delete addedIf[id];

    stringify();

    idCount--;
}
// String("S"+j+"if"+i)
function checkIfValues() {

    var status = [];
    for (var i = 1; i <= idCount; i++) {
        inputs = document.getElementById("ifBlocks").getElementsByTagName("input");
        selects = document.getElementsByTagName("select");

        pushStatus = {}
        pushStatus[1] = inputs[0 + i * 5].value;
        pushStatus[2] = inputs[1 + i * 5].value;
        pushStatus[3] = inputs[2 + i * 5].value;
        pushStatus[4] = inputs[3 + i * 5].value;
        pushStatus[5] = inputs[4 + i * 5].value;
        esel = selects[i + 1];
        pushStatus[6] = esel.options[esel.selectedIndex].value;
        status.push(pushStatus);
    }
    // console.log(status);
    var j = 1;
    status.forEach(function (x) {
        // console.log(x[6]);
        addedIf[j] = `
        if(S1 == `+ x[1] + ` and S2 == ` + x[2] + ` and S3 == ` + x[3] + ` and S4 == ` + x[4] + ` and S5 == ` + x[5] + `){
            `+ x[6] + `();
        }`;
        j++;
    }
    );
    stringify();
}


var visibleUS = false, visibleIR = false;
var usBlock = "";
var vDist, vFnUS;

function toggleUS() {
    var usBlockRef = document.getElementById("ultrasonicBlock");
    visibleUS = !visibleUS;
    style = "";
    visibleUS ? style = "block" : style = "none";
    usBlockRef.style.display = style;
    handleOnChange();
}

var vTRIGGER_PIN, vECHO_PIN, vDist;
var vIR1, vIR2, vIR3, vIR4, vIR5, vENA, vENB, vRM1, vRM2, vLM1, vLM2, vSP_EN1, vSP_EN2;
var vfRM1, vfRM2, vfLM1, vfLM2,
    vrRM1, vrRM2, vrLM1, vrLM2, vrENA, vrENB,
    vlRM1, vlRM2, vlLM1, vlLM2, vlENA, vlENB,
    vd360RM1, vd360RM2, vd360LM1, vd360LM2, vd360ENA, vd360ENB;
var vS1if0 = 0, vS2if0 = 0, vS3if0 = 0, vS4if0 = 0, vS5if0 = 0, vFnif0;

var usDistFunction = `
float c = 0;
    int dist(){
    digitalWrite(TRIGGER_PIN,LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER_PIN,HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN,LOW);
    int dur=pulseIn(ECHO_PIN, HIGH);
    c=dur*0.0294/2;
    return c;
}`;

var usPins = `    
#define TRIGGER_PIN 9
#define ECHO_PIN 10
`;

var irPins = `
#define IR1 A1
#define IR2 A2
#define IR3 A3
#define IR4 A4
#define IR5 A5

int S1=0, S2=0, S3=0, S4=0, S5=0;
`;

var motorPins = `
#define EN2 3
#define RM1 4
#define RM2 5
#define EN1 6 
#define LM1 7
#define LM2 8`;

var functions = `
void forward(){
    Serial.print("Forwards Triggered");
    digitalWrite(RM1,HIGH);
    digitalWrite(RM2,LOW);
    analogWrite(EN2,SP_EN2);
    digitalWrite(LM1,HIGH);
    digitalWrite(LM2,LOW);
    analogWrite(EN1,SP_EN1);   
}

void right(){
    Serial.print("Right Triggered");
    digitalWrite(RM1,LOW);
    digitalWrite(RM2,LOW);
    analogWrite(EN2,0);
    digitalWrite(LM1,HIGH);
    digitalWrite(LM2,LOW);
    analogWrite(EN1,SP_EN1);
}

void left(){
    Serial.print("Right Triggered");
    digitalWrite(RM1,HIGH);
    digitalWrite(RM2,LOW);
    analogWrite(EN2,SP_EN2);
    digitalWrite(LM1,LOW);
    digitalWrite(LM2,LOW);
    analogWrite(EN1,0);
}

void deg360(){
    Serial.print("Right Triggered");
    digitalWrite(RM1,HIGH);
    digitalWrite(RM2,LOW);
    analogWrite(EN2,SP_EN2);
    digitalWrite(LM1,LOW);
    digitalWrite(LM2,HIGH);
    analogWrite(EN1,SP_EN1);
}

void reverse(){
    Serial.print("Reverse Triggered");
    digitalWrite(RM1,LOW);
    digitalWrite(RM2,HIGH);
    analogWrite(EN2,SP_EN2);
    digitalWrite(LM1,LOW);
    digitalWrite(LM2,HIGH);
    analogWrite(EN1,SP_EN1);   
}

void stop(){
    Serial.print("Right Triggered");
    digitalWrite(RM1,LOW);
    digitalWrite(RM2,LOW);
    digitalWrite(LM1,LOW);
    digitalWrite(LM2,LOW);
    analogWrite(EN1,0);
    analogWrite(EN2,0);
}
`;
var motorAndEnablesSetup = `
// MOTOR AND ENABLES
pinMode (RM1, OUTPUT);
pinMode (RM2, OUTPUT);
pinMode (LM1, OUTPUT);
pinMode (LM2, OUTPUT);
pinMode (EN1, OUTPUT);
pinMode (EN2, OUTPUT);
`;
var irSetup = `
// IR ARRAY
pinMode (IR1, INPUT);
pinMode (IR2, INPUT);
pinMode (IR3, INPUT);
pinMode (IR4, INPUT);
pinMode (IR5, INPUT);
`;
var usSetup = `
// ULTRASONIC SENSOR
pinMode(ECHO_PIN,INPUT);
pinMode(TRIGGER_PIN,OUTPUT);
`;
var ledBlink = `
digitalWrite(LED_BUILDIN,HIGH);
delay(1000);
digitalWrite(LED_BUILDIN,LOW);
delay(1000);
`;
function irReads(){
    return (comment ? "//" : "") + `S1 = digitalRead(IR1);
	S2 = digitalRead(IR2);
	S3 = digitalRead(IR3);
	S4 = digitalRead(IR4);
    `+ (comment ? "//" : "") + `S5 = digitalRead(IR5);`;
}
function allFunctions() {
    piece = `float SP_EN1 = ` + (vSP_EN1=="0"?"20":vSP_EN1) + `;
float SP_EN2 = `+ (vSP_EN2=="0"?"20":vSP_EN2) + `;`;

    return piece + functions;
}
function handleOnChange() {


    vDist = document.getElementById("dist").value;
    var eus = document.getElementById("FnUS");
    // console.log(e);
    vFnUS = eus.options[eus.selectedIndex].text;


    vSP_EN1 = document.getElementById("SP_EN1").value;
    vSP_EN2 = document.getElementById("SP_EN2").value;

    vS1if0 = document.getElementById("S1if0").value;
    vS2if0 = document.getElementById("S2if0").value;
    vS3if0 = document.getElementById("S3if0").value;
    vS4if0 = document.getElementById("S4if0").value;
    vS5if0 = document.getElementById("S5if0").value;

    var eif = document.getElementById("Fnif0");
    vFnif0 = eif.options[eif.selectedIndex].text;

    checkIfValues();

    usBlock = `if(dist()<` + vDist + `){
            `+ vFnUS + `();
            delay(10);
        }else{
            forward();
        }`;
    changeArduino();
}
function stringify() {
    addedIfString = "";
    for (x in addedIf) {
        addedIfString += addedIf[x];
    }
    changeArduino();
}
//`+vv+`
function changeArduino() {

    code = `` + (visibleUS ? usPins : "") + `
`+ (visibleIR ? irPins : "") + `
`+ (visibleUS || visibleIR ? motorPins : "") + `
`+ (visibleUS || visibleIR ? allFunctions() : "") + `
void setup(){
    Serial.begin(9600);
    `+ (!visibleUS && !visibleIR ? `pinMode(LED_BUILTIN, OUTPUT);` : "") + `
    `+ (visibleUS || visibleIR ? motorAndEnablesSetup : "") + `
    `+ (visibleIR ? irSetup : "") + `
    `+ (visibleUS ? usSetup : "") + `
}
`+ (visibleUS ? usDistFunction : "") + `
void loop(){
    `+ (!visibleUS && !visibleIR ? ledBlink : "") + `

    `+ (visibleUS ? usBlock : "") + `
    `+ (visibleIR ? irReads()+`

	if(S1 == `+ vS1if0 + ` and S2 == ` + vS2if0 + ` and S3 == ` + vS3if0 + ` and S4 == ` + vS4if0 + ` and S5 == ` + vS5if0 + `){
            `+ vFnif0 + `();
	}
    `+ addedIfString + `
    ` : "") + `
}`;
    document.getElementById("arduinoCodeDiv").innerText = code;

}


  // ----------------------------------------- copy function start

// function copyToCB(containerid) {
//     if (document.selection) {
//         var range = document.body.createTextRange();
//         range.moveToElementText(document.getElementById(containerid));
//         range.select().createTextRange();
//         document.execCommand("copy");
//     } else if (window.getSelection) {
//         var range = document.createRange();
//         range.selectNode(document.getElementById(containerid));
//         window.getSelection().addRange(range);
//         document.execCommand("copy");
//         alert("Text has been copied, now paste in the text-area")
//     }
// }


function copyToClipboard(element,st){


    var dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value = document.getElementById(element).innerText;
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy);


    // var textarea = document.createElement('textarea');
    // textarea.textContent = document.getElementById(element).innerText;
    // document.body.appendChild(textarea);
  
    // var selection = document.getSelection();
    // var range = document.createRange();
    
    // range.selectNode(textarea);
    // selection.removeAllRanges();
    // selection.addRange(range);
  
    alert(st=='upload'?'Copy success! Paste the code in editor.':'Copy success!', document.execCommand('copy'));
    // selection.removeAllRanges();
  
    // document.body.removeChild(textarea);
    
  }


// ----------------------------------------- copy function end
// ----------------------------------------- save code start

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
function saveCode(element){
    text = document.getElementById(element).innerText;
    download('code.ino',text);
}
// ----------------------------------------- save code end

function choiceCheck(st) {
    if(st=='bt' && bluetoothCheck.checked){
        lineFollowerCheck.checked = false;
        ultrasoniceCheck.checked = false;
        playgroundCheck.checked = false;
        visibleUS = false;
        visibleIR = false;
        handleBtChanges();
        return;
    }else if(st=='pg'){
        lineFollowerCheck.checked = false;
        ultrasoniceCheck.checked = false;
        bluetoothCheck.checked = false;
        handlePlaygroundChanges();
        return;
    }
    visibleIR = lineFollowerCheck.checked;
    visibleUS = ultrasoniceCheck.checked;
    playgroundCheck.checked = false;
    bluetoothCheck.checked = false;
    
    handleOnChange();
}
var comment = false;
function radioCheck(num){
    comment = (num == 3? true : false);
}
var uVal, dVal, rVal, lVal, sVal, srVal, slVal;
var uValv, dValv, rValv, lValv, sValv, srValv, slValv;

var vIP1, vIP2, vIP3, vIP4, vIP5, vIP6, vIP7, vIP8;
var ct='btn';
function showHideBluetoothBlocks(controllerType){
    ct = controllerType === null ? ct : controllerType;
    if(ct ==='btn'){
        document.getElementById("bluetoothBtnController").className = "show";
        document.getElementById("bluetoothVoiceController").className = "hide";
    }else if(ct === 'voice'){
        document.getElementById("bluetoothBtnController").className = "hide";
        document.getElementById("bluetoothVoiceController").className = "show";
    }else{
        document.getElementById("bluetoothBtnController").className = "hide";
        document.getElementById("bluetoothVoiceController").className = "hide";
    }
}

function handleBtChanges() {

    u = document.getElementById('btControlsU');
    d = document.getElementById('btControlsD');
    r = document.getElementById('btControlsR');
    l = document.getElementById('btControlsL');
    s = document.getElementById('btControlsS');
    sr = document.getElementById('btControlsSR');
    sl = document.getElementById('btControlsSL');
    hr = document.getElementById('btControlsHR');

    uVal = u.options[u.selectedIndex].text;
    dVal = d.options[d.selectedIndex].text;
    rVal = r.options[r.selectedIndex].text;
    lVal = l.options[l.selectedIndex].text;
    sVal = s.options[s.selectedIndex].text;
    srVal = sr.options[sr.selectedIndex].text;
    slVal = sl.options[sl.selectedIndex].text;
    hrVal = hr.options[hr.selectedIndex].text;


    // vIP1 = document.getElementById('vIP1').value;
    // vIP2 = document.getElementById('vIP2').value;
    // vIP3 = document.getElementById('vIP3').value;
    // vIP4 = document.getElementById('vIP4').value;
    // vIP5 = document.getElementById('vIP5').value;
    // vIP6 = document.getElementById('vIP6').value;
    // vIP7 = document.getElementById('vIP7').value;
    // vIP8 = document.getElementById('vIP8').value;

    // uv = document.getElementById('btControlsUv');
    // dv = document.getElementById('btControlsDv');
    // rv = document.getElementById('btControlsRv');
    // lv = document.getElementById('btControlsLv');
    // sv = document.getElementById('btControlsSv');
    // srv = document.getElementById('btControlsSRv');
    // slv = document.getElementById('btControlsSLv');
    // hrv = document.getElementById('btControlsHRv');

    // uValv = uv.options[uv.selectedIndex].text;
    // dValv = dv.options[dv.selectedIndex].text;
    // rValv = rv.options[rv.selectedIndex].text;
    // lValv = lv.options[lv.selectedIndex].text;
    // sValv = sv.options[sv.selectedIndex].text;
    // srValv = srv.options[srv.selectedIndex].text;
    // slValv = slv.options[slv.selectedIndex].text;
    // hrValv = hrv.options[hrv.selectedIndex].text;

    btController(ct);
    // btCodeHandler(controllerType);
}
var cd;
function btController(cnt){
    if(cnt == 'btn'){
        cd =`
    if(Serial.available() > 0){
        recieved = Serial.read();
        Serial.print(recieved);
        Serial.print("\n");
        if(recieved ==      'u')`+uVal+`();  
        else if(recieved == 'd')`+dVal+`();
        else if(recieved == 'l')`+lVal+`();
        else if(recieved == 'r')`+rVal+`();
        else if(recieved == 's')`+sVal+`();
        else if(recieved == 'sr')`+srVal+`();
        else if(recieved == 'sl')`+slVal+`();
        else if(recieved == 'hr')`+hrVal+`();
    }`
    }else{
        cd = '';
        let sels = document.getElementById("bluetoothVoiceBlock").getElementsByTagName("select");
        let ips = document.getElementById("bluetoothVoiceBlock").getElementsByTagName("input");
        for(let i=0; i<sels.length; i++){
            cd+=(i==0?"":"else ")+`if(voiceInput == "`+ips[i].value+`"){
            `+sels[i].options[sels[i].selectedIndex].text+`();
        }`;
        }
    }
    // console.log(cd);
    btCodeHandler();
}

function btCodeHandler() {

    code = motorPins+`
    
    float SP_EN1 = 20;
    float SP_EN2 = 20; 
    `+functions+`
    char recieved = 's';
    
    void setup(){
        Serial.begin(9600);
        `+motorAndEnablesSetup+`
    }
    void loop(){
    
    `+cd+`
    
    }`;
    document.getElementById("arduinoCodeDiv").innerText = code;
}

function addVoiceControlBlock(){
    // console.log("in");
    var voiceDiv = document.createElement("div");
    voiceDiv.innerHTML = `
            if(voiceInput == "<input type="text"/>"){
                <select name="functions" > 
                <option value="forward">forward</option>
                <option value="reverse">reverse</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="stop">stop</option>
                <option value="stop">spin right</option>
                <option value="stop">spin left</option>
                <option value="stop">horn</option>
                </select>();
            }<button onclick="deleteVoiceBlock(this)">-</button>
    `;
    addVoiceBlockRef.appendChild(voiceDiv);
    // highlight();
}

function deleteVoiceBlock(ref){
    ref.parentNode.remove();
}
//---------------------------------------------actiive class

function addActiveClass(elt) {

    var btn = document.getElementsByClassName("active");
    // console.log(btn);
    
    // console.log(btn[0].id);
    let hide = btn[0].id;
    hide = hide.replace('NavBtn','');
    // Loop through the buttons and add the active class to the current/clicked button;
    btn[0].className = " ";
    document.getElementById(hide).className = "hide";

    document.getElementById(elt+"NavBtn").classList.add('active');
    // document.getElementById(elt).classList.remove('hide');
    document.getElementById(elt).className = "show";
    // Get all buttons with class="btn" inside the container




}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
//---------------------------------------------actiive class end


var pgBlock = `<select name="functions">
    <option value="forward">forward</option>
    <option value="reverse">reverse</option>
    <option value="left">left</option>
    <option value="right">right</option>
    <option value="stop">stop</option>
    </select>();  delay(<input class="SS ipPG" oninput="this.style.width = ((this.value.length + 2) * 10) + 'px';" type="text" value="1000"/>);<button id="deleteFnInPlaygroundBtn" onclick="deletePlaygroundBlock(this)">-</button><br><br>`;

function addPlaygroundBlock(){
    var fnDiv = document.createElement("div");
    fnDiv.innerHTML = pgBlock;
    addPgBlockRef.appendChild(fnDiv);
    // highlight();
}
function deletePlaygroundBlock(ref){
    ref.parentNode.remove();
}
function getPgData(){
    var sels = document.getElementById("pgCode").getElementsByTagName("select");
    var ips = document.getElementById("pgCode").getElementsByTagName("input");
    var code = "";
    for(i=0; i<sels.length; i++){
        // console.log(sels[i].options[sels[i].selectedIndex].text);
        // console.log(ips[i].value);
        code+=`    
    `+sels[i].options[sels[i].selectedIndex].text+`();
    delay(`+ips[i].value+`);`;
    }
    return code;
}
function handlePlaygroundChanges(){
    loopContent = getPgData();

    code = `
    `+motorPins+`
float SP_EN1 = 20;
float SP_EN2 = 20; 
    `+functions+`
void setup(){
    Serial.begin(9600);
    `+motorAndEnablesSetup+`
}
void loop(){
    `+loopContent+`
}`;

    document.getElementById("arduinoCodeDiv").innerText = code;
}


