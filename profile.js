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

dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // grabbing the values from FB DB and storing relavent info in variables
    var userFirstName = childSnapshot.val().firstName;
    var userLastName = childSnapshot.val().lastName;
    var userGender = childSnapshot.val().gender;
    var userAge = childSnapshot.val().userage;
    var userWeight = childSnapshot.val().userweight;
    var userGoalWeight = childSnapshot.val().usergoalweight;
    var userHeightFeet = childSnapshot.val().userheightfeet;
    var userHeightInches = childSnapshot.val().userheightinches;
    var userActLevel = childSnapshot.val().useractivitylevel;

    $("#userName").text(userFirstName + " " + userLastName);
    $("#userGender").text(userGender);
    $("#userAge").text(userAge);
    $("#userWeight").text(userWeight);
    $("#userGoalWeight").text(userGoalWeight);
    $("#userHeight").text(userHeightFeet + "' " + userHeightInches + '"');
    $("#userActLevel").text(userActLevel);
});