
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
}