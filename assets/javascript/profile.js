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
var profileRef = "/" + uid + "/profile";

dataRef.ref(profileRef).on("child_added", function (snapshot) {

    // grabbing the values from FB DB and storing relavent info in variables
    var userFirstName = snapshot.val().firstName;
    console.log(userFirstName);
    var userLastName = snapshot.val().lastName;
    var userGender = snapshot.val().gender;
    var userAge = snapshot.val().userage;
    var userWeight = snapshot.val().userweight;
    console.log(userWeight);
    var userGoalWeight = snapshot.val().usergoalweight;
    var userHeightFeet = snapshot.val().userheightfeet;
    var userHeightInches = snapshot.val().userheightinches;
    var userActLevel = snapshot.val().useractivitylevel;

    $("#nav-username").text(userFirstName);
    $("#userName").text(userFirstName + " " + userLastName);
    $("#userGender").text(userGender);
    $("#userAge").text(userAge);
    $("#userWeight").text(userWeight);
    $("#userGoalWeight").text(userGoalWeight);
    $("#userHeight").text(userHeightFeet + "' " + userHeightInches + '"');
    $("#userActLevel").text(userActLevel);
});

if(uid) {

}