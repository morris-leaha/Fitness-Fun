//Nutritionix API: 68bd18dff81e4268ce3dd68b02a4f509

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
var exerciseRef = "/" + uid + "/exercise";
var totalBurnedCals = 0;
var calsPerExercise = {};
var currentDate = moment().format("YYYY-MM-DD");


//Form Validation
var validateExerciseForm = function (exercise) {

    if (
        !exercise.exerciseName ||
        !exercise.exerciseDuration ||
        !exercise.exerciseCalsBurned ||
        !exercise.entryTime ||
        !exercise.entryDate ||
        isNaN(exercise.exerciseDuration) ||
        isNaN(exercise.exerciseCalsBurned)) {
        console.log("Form Failed");
    } else {
        dataRef.ref(exerciseRef).push(exercise)
        $("#exercise-name-input").val("");
        $("#exercise-duration-input").val("");
        $("#exercise-cals-burned-input").val("");
    }
}
// adding exercise to table 
$("#add-exercise-btn").on("click", function (event) {
    event.preventDefault();

    // get input data
    var exerciseName = $("#exercise-name-input").val().trim();
    var exerciseDuration = $("#exercise-duration-input").val().trim();
    var exerciseCalsBurned = $("#exercise-cals-burned-input").val().trim();
    var entryTime = moment().format("YYYY-MM-DD HH:mm");
    var entryDate = moment().format("YYYY-MM-DD");

    console.log(exerciseName);
    console.log(exerciseDuration);
    console.log(exerciseCalsBurned);
    console.log(entryTime);
    console.log(entryDate);

    // Creates local "temporary" object for holding data
    var exerciseInfo = {
        exerciseName: exerciseName,
        exerciseDuration: exerciseDuration,
        exerciseCalsBurned: exerciseCalsBurned,
        entryDate: entryDate,
        entryTime: entryTime
    };

    validateExerciseForm(exerciseInfo);
});

var appendTable = function (exerciseObject) {
    var exerciseRow = $("<tr>").append(

        $("<td>").text(exerciseObject.exerciseName),
        $("<td>").text(exerciseObject.exerciseDuration),
    )

    $("#exercise-table > tbody").append(exerciseRow);
    totalBurnedCals += parseInt(exerciseObject.exerciseCalsBurned);
    $("#total-cal").text(totalCal);
}

// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function (childSnapshot) {

    // if(currentDate) {
    //     var exerciseObject = childSnapshot.val();
    //     var initDate = moment(exerciseObject.entryTime, "YYYY-MM-DD");
    //     var currentTime = moment();
    //     var convCurrTime = moment(currentTime, "YYYY-MM-DD");
    //     var dateDiff = convCurrTime.diff(initDate, "days");
    //     if(dateDiff < 8){
    //         appendTable(exerciseObject);
    //     }
    // });

    var exerciseDurationDB = childSnapshot.val().exerciseDuration;
    var exerciseCalsBurnedDB = childSnapshot.val().exerciseCalsBurned;
    var exerciseNameDB = childSnapshot.val().exerciseName;


    // Create the new row

    var exerciseRow = $("<tr>").append(

        $("<td>").text(exerciseNameDB),
        $("<td>").text(exerciseDurationDB),
        $("<td>").text(exerciseCalsBurnedDB),
    );

    // Append the new row to the table
    $("#exercise-table > tbody").append(exerciseRow);


});
