var firebaseConfig = {
    apiKey: "API KEY",
    authDomain: "AUTH DOMAIN",
    databaseURL: "DATABASE URL",
    projectId: "PROJECT ID",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


const auth = async() => {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var docRef = await db.collection("MobileApp").doc("Auth");

    docRef.get().then(function(doc) {

        if (doc.exists) {
            var d = doc.data()
            if (user == d.username && pass == d.password) {
                console.log("passed")
                window.location.replace("./pages/home/home.html")
            } else {
                window.alert("username or password invalid")
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return { log: "error" };
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });



}
const create = async() => {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var ref = db.collection("MobileApp");

    ref.doc("Auth").set({
        username: user,
        password: pass
    }).then(res => {
        window.location.replace("../../index.html")
    });
}

const loadNotes = async() => {

    var ln = 8;
    for (let i = 0; i < ln; i++) {
        getNote("" + (i + 1))
    }

}

const getNote = async(arg) => {
    var ref = await db.collection("MobileApp").doc(arg);
    ref.get().then(function(doc) {

        if (doc.exists) {
            var data = doc.data()
            document.getElementById("time-" + arg).innerHTML = data.time
            document.getElementById("content-" + arg).innerHTML = data.content

        } else {
            console.log("not found")
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

const setNote = async(arg, time, content) => {
    var ref = db.collection("MobileApp");

    ref.doc(arg).set({
        time: time,
        content: content
    });
}

// THE INCOME ADD EDIT DELETE
