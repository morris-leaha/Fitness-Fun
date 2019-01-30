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

//Form Validation
var validateNutritionForm = function (exercise) {

    if (!exercise.classification ||
        !exercise.exercisename ||
        !exercise.exerciseduration ||
        !exercise.exercisecalsburned ||
        !exercise.exercisecurrentTime
    ) {
        console.log("Form Failed");
    } else {
        dataRef.ref().push(exercise)
        $("#exercise-name-input").val("");
        $("#exercise-duration-input").val("");
        $("#exercise-cals-burned-input").val("");
    }
}
// adding exercise to table 
$("#add-exercise-btn").on("click", function (event) {
    event.preventDefault();

    // get input data
    var classification = "exercise";
    var exercisename = $("#exercise-name-input").val().trim();
    var exerciseduration = $("#exercise-duration-input").val().trim();
    var exercisecalsburned = $("#exercise-cals-burned-input").val().trim();
    var exercisecurrentTime = moment().format("YYYY-MM-DD HH:mm Z");

    console.log(exercisename);
    console.log(exerciseduration);
    console.log(exercisecalsburned);
    console.log(exercisecurrentTime);
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Creates local "temporary" object for holding data
    var exerciseInfo = {
        classification: classification,
        exercisename: exercisename,
        exerciseduration: exerciseduration,
        exercisecalsburned: exercisecalsburned,
        exercisecurrentTime: exercisecurrentTime
    };

    validateNutritionForm(exerciseInfo);


});

// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref().on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var exercisedurationdb = childSnapshot.val().exerciseduration;
    var exercisecalsburneddb = childSnapshot.val().exercisecalsburned;
    var exercisenamedb = childSnapshot.val().exercisename;


    // Create the new row
    if (childSnapshot.val().classification === "exercise") {
        var exerciseRow = $("<tr>").append(

            $("<td>").text(exercisenamedb),
            $("<td>").text(exercisedurationdb),
            $("<td>").text(exercisecalsburneddb),
        );

        // Append the new row to the table
        $("#exercise-table > tbody").append(exerciseRow);
    }

});