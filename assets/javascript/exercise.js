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
var exerciseRef = "/" + uid + "/exercise";
console.log(exerciseRef);
var profileRef = "/" + uid + "/profile";
console.log(profileRef);
var userWeight;

var calsPerExercise = {};

//Get User's weight
dataRef.ref(profileRef).on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot.val());
        userWeight = childSnapshot.val().userweight;
        console.log(userWeight);    
    });
});

//Form Validation
var validateExerciseForm = function (exercise) {

    if (!exercise.exercisename ||
        !exercise.exerciseduration ||
        !exercise.calsBurn ||
        !exercise.exercisecurrentTime
    ) {
        console.log("Form Failed");
    } else {
        dataRef.ref(exerciseRef).push(exercise)
        $("#exercise-name-input").val("");
        $("#exercise-duration-input").val("");
        // $("#exercise-cals-burned-input").val("");
    }
}
// adding exercise to table 
$("#add-exercise-btn").on("click", function (event) {
    event.preventDefault();
    //console.log("hello");
    // get input data
    // var classification = "exercise";
    var exercisename = $(".exercise-name-input option:selected").val();
    var exerciseMet = $(".exercise-name-input option:selected").attr("data-met");
    console.log(exerciseMet)
    var exerciseduration = $("#exercise-duration-input").val().trim();
    //var exercisecalsburned = $("#exercise-cals-burned-input").val().trim();
    var exercisecurrentTime = moment().format("YYYY-MM-DD HH:mm Z");

    var calsBurn = Math.round(exerciseMet * (exerciseduration / 60) * (userWeight / 2.2));
    console.log(calsBurn);

    console.log(exercisename);
    console.log(exerciseduration);
    //console.log(exercisecalsburned);
    console.log(exercisecurrentTime);
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Creates local "temporary" object for holding data
    var exerciseInfo = {
        exercisename: exercisename,
        exerciseduration: exerciseduration,
        //exercisecalsburned: exercisecalsburned,
        calsBurn: calsBurn,
        exercisecurrentTime: exercisecurrentTime
    };

    validateExerciseForm(exerciseInfo);
});

// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var exercisedurationdb = childSnapshot.val().exerciseduration;
    //var exercisecalsburneddb = childSnapshot.val().exercisecalsburned;
    var calsBurndb = childSnapshot.val().calsBurn;
    var exercisenamedb = childSnapshot.val().exercisename;


    // var exerciseData = childSnapshot.val().exercise;
    // var durationData = childSnapshot.val().duration;
    // var burnCalorieData = childSnapshot.val().exercisecalsburned;
    
    


    // Create the new row

    var exerciseRow = $("<tr>").append(

        $("<td>").text(exercisenamedb),
        $("<td>").text(exercisedurationdb),
        $("<td>").text(calsBurndb),
    );

    console.log(exerciseRow);

    // Append the new row to the table
    $("#exercise-table > tbody").append(exerciseRow);


});
