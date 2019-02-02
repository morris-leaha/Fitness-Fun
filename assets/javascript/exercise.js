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
var profileRef = "/" + uid + "/profile";
var userWeight;

var calsPerExercise = {};

//Form Validation
var validateExerciseForm = function (exercise) {

    if (!exercise.exercisename ||
        !exercise.exerciseduration ||
        //!exercise.exercisecalsburned ||
        !exercise.exercisecurrentTime
    ) {
        console.log("Form Failed");
    } else {
        dataRef.ref("/exercise").push(exercise)
        $("#exercise-name-input").val("");
        $("#exercise-duration-input").val("");
       // $("#exercise-cals-burned-input").val("");
    }
}
// adding exercise to table 
$("#add-exercise-btn").on("click", function (event) {
    event.preventDefault();
    console.log("hello");
    // get input data
    // var classification = "exercise";
    var exercisename = $(".exercise-name-input option:selected").val();
    var exerciseMet = $(".exercise-name-input option:selected").attr("data-met");
    console.log(exerciseMet)
    var exerciseduration = $("#exercise-duration-input").val().trim();
    //var exercisecalsburned = $("#exercise-cals-burned-input").val().trim();
    var exercisecurrentTime = moment().format("YYYY-MM-DD HH:mm Z");

    var calsBurn = exerciseMet * exerciseduration;
    console.log(calsBurn)

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
        exercisecurrentTime: exercisecurrentTime
    };

    validateExerciseForm(exerciseInfo);
});

dataRef.ref(profileRef).on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
        userWeight = childSnapshot.userweight;
        console.log(userWeight);
    })
})
// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var exercisedurationdb = childSnapshot.val().exerciseduration;
    //var exercisecalsburneddb = childSnapshot.val().exercisecalsburned;
    var exercisenamedb = childSnapshot.val().exercisename;


    var exerciseData = childSnapshot.val().exercise;
    var durationData = childSnapshot.val().duration;
    var burnCalorieData = childSnapshot.val().exercisecalsburned;
    
    


    // Create the new row

    var exerciseRow = $("<tr>").append(

        $("<td>").text(exercisenamedb),
        $("<td>").text(exercisedurationdb),
        $("<td>").text(exercisecalsburneddb),
    );

    // Append the new row to the table
    $("#exercise-table > tbody").append(exerciseRow);


});

$("#sign-out").on("click", function(){

    firebase.auth().signOut().then(function() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }, function(error){
        console.log("Sign Out Error", error);
    });
});


