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
    }else if(rootDoc === 'newsletter'){
        email = document.getElementById('newsletterEmail').value;
    }else if(rootDoc === 'review'){
        message = document.getElementById('review').value;
        name = document.getElementById('name').value;
        city = document.getElementById('city').value;
        email = name = document.getElementById('email').value;
    }else if(rootDoc === 'iWantBot'){
        email = document.getElementById('emailBuy').value;
    }else if(rootDoc === 'getCallBack'){
        name = document.getElementById('inputEmail4').value;
        parentsName = document.getElementById('inputPassword4').value;
        parentsContact = document.getElementById('inputAddress').value;
        email = document.getElementById('inputAddress2').value;
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
    data.createdAt =  firebase.firestore.FieldValue.serverTimestamp();;
    db.collection("emailFunctions").doc(rootDoc).collection(rootCollection).doc(email).set({data})
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}