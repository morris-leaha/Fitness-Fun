// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgFgcmDm5gwBlUoc9cv6174w5gHjiPkU0",
    authDomain: "fitness-fun-project-1.firebaseapp.com",
    databaseURL: "https://fitness-fun-project-1.firebaseio.com",
    projectId: "fitness-fun-project-1",
    storageBucket: "fitness-fun-project-1.appspot.com",
    messagingSenderId: "381935885658"
};
firebase.initializeApp(config);

var dataRef = firebase.database();
var uid = sessionStorage.getItem("uid");
console.log(uid);
var profileRef = "/" + uid + "/profile"

//Read cookie containing user data, only works if cookie contains one key-value pair
var readCookie = function(){
    
    //Split key and value
    if(document.cookies){
        var cookieParts = document.cookie.split("=");
        var uid = cookieParts[1].slice(0, -1);
        return uid;
    }
    return null;
}

dataRef.ref(profileRef).on("child_added", function (childSnapshot) {

    // grabbing the values from FB DB and storing relavent info in variables
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var userGender = childSnapshot.val().gender;
    var userAge = childSnapshot.val().userage;
    var userWeight = childSnapshot.val().userweight;
    var userGoalWeight = childSnapshot.val().usergoalweight;
    var userHeightFeet = childSnapshot.val().userheightfeet;
    var userHeightInches = childSnapshot.val().userheightinches;

    // calculating user BMR, or user daily calories
    var convertedWeight = (userWeight / 2.205);

    var convertedHeightInches = ((userHeightFeet * 12) + parseInt(userHeightInches));

    var convertedHeightCentimeters = (convertedHeightInches * 2.54);


    if (userGender === "male") {
        var maleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * userAge) + 5));
        console.log("Male current BMR: " + maleBMR);
        $("#user-dailyCals").text(maleBMR);
    }
    else if (userGender === "female") {
        var femaleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * userAge) - 161));
        console.log("Female current BMR: " + femaleBMR);
        $("#user-dailyCals").text(femaleBMR);
    }
});

dataRef.ref().on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();

        if(childData.classification === "exercise"){
            console.log(childData);
        }
    });
});

//uid = readCookie();

// if(!uid){
//     window.location.href = "index.html";
// }