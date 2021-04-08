window.onload = function() {
    addIfBlockRef = document.getElementById("ifBlocks");
    document.getElementById("cover").style.display = "none";
    document.getElementById("loader").style.display = "none";

    handleOnChange();
    changeArduino();
}
var body = document.getElementsByTagName('body')[0];
var idCount = 0;
function addIfBlock(){

    var ifDiv = document.createElement("div");
    idCount+=1;
    ifDiv.id = "if"+idCount;
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
*/
function createIfBlock(idCount){
    //code if
    addedIf[idCount]=`
        if(S1 ==  and S2 ==  and S3 ==  and S4 ==  and S5 == ){
		    ();
	}`;

    return [
    "\
    if(S1 == <input class=\"SS\" id=\"S1if"+idCount+"\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S2 == <input class=\"SS\" id=\"S2if"+idCount+"\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S3 == <input class=\"SS\" id=\"S3if"+idCount+"\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S4 == <input class=\"SS\" id=\"S4if"+idCount+"\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/> && S5 == <input class=\"SS\" id=\"S5if"+idCount+"\" type=\"number\" min=\"0\" max=\"1\" oninput=\"handleOnChange();this.style.width = ((this.value.length +2) * 20) + 'px';\" required/>){<br>\
        <select name=\"functions\" id=\"Fnif"+idCount+"\" oninput=\"checkIfValues();\">\
            <option value=\"forward\" selected>forward</option>\
            <option value=\"reverse\">reverse</option>\
            <option value=\"left\">left</option>\
            <option value=\"right\">right</option>\
            <option value=\"stop\">stop</option>\
        </select>();<br>\
    }<button type=\"button\" id=\"delBtn"+idCount+"\"onclick=\"deleteIfBlock(this);\">-</button>"
    ].join('\n');
}
function deleteIfBlock(e){
    id = e.getAttribute("id");
    id = id.split("n").pop();
    delDiv = document.getElementById("if"+id);
    delDiv.remove();

    delete addedIf[id];

    stringify();

    idCount--;
}
// String("S"+j+"if"+i)
function checkIfValues(){
    
    var status = [];
    for(var i=1; i<=idCount; i++){
        inputs = document.getElementById("ifBlocks").getElementsByTagName("input");
        selects = document.getElementsByTagName("select");
        
        pushStatus = {}
        pushStatus[1] = inputs[0+i*5].value;
        pushStatus[2] = inputs[1+i*5].value;
        pushStatus[3] = inputs[2+i*5].value;
        pushStatus[4] = inputs[3+i*5].value;
        pushStatus[5] = inputs[4+i*5].value;
        esel = selects[i+1];
        pushStatus[6] = esel.options[esel.selectedIndex].value;
        status.push(pushStatus);
    }
    // console.log(status);
    var j = 1;
    status.forEach(function(x){
        // console.log(x[6]);
        addedIf[j] = `
        if(S1 == `+x[1]+` and S2 == `+x[2]+` and S3 == `+x[3]+` and S4 == `+x[4]+` and S5 == `+x[5]+`){
            `+x[6]+`();
        }`;
        j++;
    }
    );
    stringify();
}


var visibleUS = false;
var usBlock = "";
var vDist, vFnUS;

function toggleUS(){
    var usBlockRef = document.getElementById("ultrasonicBlock");
    visibleUS = !visibleUS;
    style="";
    visibleUS? style = "block" : style = "none";
    usBlockRef.style.display = style;
    handleOnChange();
}

var vTRIGGER_PIN, vECHO_PIN, vDist;
var vIR1, vIR2, vIR3, vIR4, vIR5, vENA, vENB, vRM1, vRM2, vLM1, vLM2, vSP_ENA, vSP_ENB;
var vfRM1, vfRM2, vfLM1, vfLM2,
    vrRM1, vrRM2, vrLM1, vrLM2, vrENA, vrENB,
    vlRM1, vlRM2, vlLM1, vlLM2, vlENA, vlENB,
    vd360RM1, vd360RM2, vd360LM1, vd360LM2, vd360ENA, vd360ENB;
var vS1if0, vS2if0, vS3if0, vS4if0, vS5if0, vFnif0;
function handleOnChange(){

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

    usBlock = `if(dist()<`+vDist+`){
            `+vFnUS+`();
            delay(10);
        }`;
    changeArduino();
}
function stringify(){
    addedIfString = "";
    for(x in addedIf){
        addedIfString += addedIf[x];
    }
    changeArduino();
}
//`+vv+`
function changeArduino(){
    code = `#define TRIGGER_PIN 9
#define ECHO_PIN 10 

#define IR1 A1
#define IR2 A2
#define IR3 A3
#define IR4 A4
#define IR5 A5

#define EN2 3
#define RM1 4
#define RM2 5
#define EN1 6 
#define LM1 7
#define LM2 8

float SP_EN1 = `+vSP_EN1+`;
float SP_EN2 = `+vSP_EN2+`;
float c = 0;


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


void setup(){
    Serial.begin(9600);
    // MOTOR AND ENABLES
    pinMode (RM1, OUTPUT);
    pinMode (RM2, OUTPUT);
    pinMode (LM1, OUTPUT);
    pinMode (LM2, OUTPUT);
    pinMode (EN1, OUTPUT);
    pinMode (EN2, OUTPUT);
    // IR ARRAY
    pinMode (IR1, INPUT);
    pinMode (IR2, INPUT);
    pinMode (IR3, INPUT);
    pinMode (IR4, INPUT);
    pinMode (IR5, INPUT);
    // ULTRASONIC SENSOR
    pinMode(ECHO_PIN,INPUT);
    pinMode(TRIGGER_PIN,OUTPUT);
}

int dist(){
    digitalWrite(TRIGGER_PIN,LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER_PIN,HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN,LOW);
    int dur=pulseIn(ECHO_PIN, HIGH);
    c=dur*0.0294/2;
    return c;
}
void loop(){
	int S1 = digitalRead(IR1);
	int S2 = digitalRead(IR2);
	int S3 = digitalRead(IR3);
	int S4 = digitalRead(IR4);
        int S5 = digitalRead(IR5);
    
        `+(visibleUS ? usBlock : "")+`

	if(S1 == `+vS1if0+` and S2 == `+vS2if0+` and S3 == `+vS3if0+` and S4 == `+vS4if0+` and S5 == `+vS5if0+`){
            `+vFnif0+`();
	}
    `+addedIfString+`
}
    `;
    document.getElementById("arduinoCodeDiv").innerText = code;

}



function copyToCB(containerid){
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied, now paste in the text-area")
      }
}

