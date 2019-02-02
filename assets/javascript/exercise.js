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

    // get exercise input data
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


// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var exercisedurationdb = childSnapshot.val().exerciseduration;
    var calsBurndb = childSnapshot.val().calsBurn;
    var exercisenamedb = childSnapshot.val().exercisename;


    
    // Create the new row

    var exerciseRow = $("<tr>").append(

        $("<td>").text(exercisenamedb),
        $("<td>").text(exercisedurationdb),
        $("<td>").text(calsBurndb),
    );

    //console.log(exerciseRow);

    // Append the new row to the table
    $("#exercise-table > tbody").append(exerciseRow);


});

var pageToken = "";


$(document).ready(function() {

    $(".popup").hide();
    $(".overlayBg").hide();
     
    $("#search-submit").click(function(){
    
        searchYoutube();
        
    });

var updateTotalBurnedCals = function(cals, time){

    var totalCals = cals;
    var entryTime = time;
    dataRef.ref(uid).once("value", function(snapshot){
      if(!snapshot.hasChild("total-cals-burned")){
        dataRef.ref(uid + "/total-cals-burned/" + entryTime).push(totalCals);
        console.log("New branch attempted...")
      } else {
        dataRef.ref(uid + "/total-cals-burned").once("value", function(snapshot){
          if(!snapshot.hasChild(entryTime)){
            dataRef.ref(uid + "/total-cals-burned/" + entryTime).push({totalCals: totalCals});
          } else {
            dataRef.ref(uid + "/total-cals-burned/").child(entryTime).update({totalCals});
          }
        })
      }
    })
  }

var appendTable = function (exerciseData, entryTime) {
    
    var exerciseObject = exerciseData;
    totalBurnedCals += parseInt(exerciseObject.exerciseCalsBurned)

    var exerciseRow = $("<tr>");
    var exerciseNameLabel = $("<td>").text(exerciseObject.exerciseName);
    var exerciseDurationLabel = $("<td>").text(exerciseObject.exerciseDuration);
    var exerciseCalsBurnedLabel = $("<td>").text(exerciseObject.exerciseCalsBurnedLabel);
    exerciseRow.append(exerciseNameLabel, exerciseDurationLabel, exerciseCalsBurnedLabel);

    $$("#nutrition-body").append(nutritionRow);
    $("#total-cals-burned").text(totalCalsBurned);
    updateTotalBurnedCals(totalCalsBurned, entryTime);
      
}

// Create Firebase event for adding exercise to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function(snapshot) {
    //snapshot.forEach(function(childSnapshot){
      var exerciseObject = snapshot.val();
      //console.log(foodObject);
      var entryTimeConv = moment(exerciseObject.entryTime).format("YYYY-MM-DD");
      console.log(entryTimeConv);
      var currentTime = moment().format("YYYY-MM-DD");
      //var currentTimeConv = moment(currentTime, "DD/MM/YYYY");
      console.log(currentTime);
      //var dateDiff = currentTime.diff(entryTimeConv, "days");
      //console.log(dateDiff);
  
      //console.log(dateDiff);
  
      if(entryTimeConv === currentTime){
        appendTable(exerciseObject, entryTimeConv);
      }
    //});
  });