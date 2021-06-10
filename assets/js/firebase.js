document.addEventListener("DOMContentLoaded", function(event) {
    init();
});
var db;
function init(){
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBaz9A8WysjSUwVBw4jwCkrVI2aqIrGA-8",
        authDomain: "robomonkee-7e6c2.firebaseapp.com",
        projectId: "robomonkee-7e6c2",
        storageBucket: "robomonkee-7e6c2.appspot.com",
        messagingSenderId: "332126505239",
        appId: "1:332126505239:web:874feac15c7e23a3350f52",
        measurementId: "G-J06KJEBXNX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    db = firebase.firestore();

}

function storeToFirebase(rootDoc, rootCollection){
    var fullName = null, email= null, message= null, parentsName= null, parentsContact= null, city= null;
    if(rootDoc === 'contactUs'){
        fullName = document.getElementById('name').value;
        email = document.getElementById('email').value;
        message = document.getElementById('message').value;
        if(fullName === "" || email === "" || message === ""){
            alert("Please fill the form properly!");
            return false;
        }
    }else if(rootDoc === 'newsletter'){
        email = document.getElementById('newsletterEmail').value;
        if(email === ""){
            alert("Please fill the form properly!");
            return false;
        }
    }else if(rootDoc === 'review'){
        message = document.getElementById('review').value;
        fullName = document.getElementById('name').value;
        city = document.getElementById('city').value;
        email = document.getElementById('email').value;
        if(fullName === "" || email === "" || message === "" || city === ""){
            alert("Please fill the form properly!");
            return false;
        }
    }else if(rootDoc === 'iWantBot'){
        email = document.getElementById('emailBuy').value;
        if(email === ""){
            alert("Please fill the form properly!");
            return false;
        }
    }else if(rootDoc === 'getCallBack'){
        fullName = document.getElementById('inputEmail4').value;
        parentsName = document.getElementById('inputPassword4').value;
        parentsContact = document.getElementById('inputAddress').value;
        email = document.getElementById('inputAddress2').value;

        if(fullName === "" || email === "" || parentsName === "" || parentsContact.length <= 9){
            alert("Please fill the form properly!");
            return false;
        }
    }
    // Add a new document in collection "cities"
    console.log(rootDoc, rootCollection);
    data = {};
    fullName && (data.name = fullName);
    email && (data.email = email);
    message && (data.message = message);
    parentsName && (data.parentsName = parentsName);
    parentsContact && (data.parentsContact = parentsContact);
    city && (data.city = city);
    data.createdAt =  firebase.firestore.FieldValue.serverTimestamp();
    done = false;
    try{
        db.collection("emailFunctions").doc(rootDoc).collection(rootCollection).doc(email).set({data});
        done = true;
    }catch(error){
        console.error("Error writing document: ", error);
        alert("Please fill the form properly!");
    }finally{
        if(!done){
            return;
        }
        Email.send({
            SecureToken : "d6bb1539-b8ef-4f67-912a-a3e0b763d24f",
            To : 'virubhosale112@gmail.com',
            From : 'vbusites@gmail.com',
            Subject : "This is regarding "+rootDoc,
            Body : "This email is coming from "+rootDoc+" "+rootCollection+" <br>"+JSON.stringify(data)+"<br> MESSAGE: <br>"+message
        }).then(
          message => console.log(message)
        );
        console.log("Document successfully written!");
        alert("Submitted Successfully! Thank you!");
    }

}

