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
    var userGender = childSnapshot.val().gender;
    var userAge = childSnapshot.val().userage;
    var userWeight = childSnapshot.val().userweight;
    var userGoalWeight = childSnapshot.val().usergoalweight;
    var userHeightFeet = childSnapshot.val().userheightfeet;
    var userHeightInches = childSnapshot.val().userheightinches;

    // calculating user BMR, or user daily calories
    var convertedWeight = (userWeight / 2.205);
    console.log("Weight in kgs: " + convertedWeight);

    var convertedHeightInches = ((userHeightFeet * 12) + parseInt(userHeightInches));
    console.log("Height in inches: " + convertedHeightInches);

    var convertedHeightCentimeters = (convertedHeightInches * 2.54);
    console.log("Height in cms: " + convertedHeightCentimeters);


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


    // need to pull total daily calories from FB & write to DOM:
        // $("#user-nutrCals").text(whateverwecallthisvariable);
        
    // need to pull total daily calories burned from FB & write to DOM:
        // $("user-exercCals").text(whateverwecallthisvariable);

    // some functionality to change daily caloric intake based on goal weight? 
    


});

