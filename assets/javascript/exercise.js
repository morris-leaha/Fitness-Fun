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

database = firebase.database();

var exercise = "";
var duration = "";
var burnCalorie = "";
var sampleVideo = "";
console.log(exercise);

$(".add-exercise").on("click", function (event) {
    event.preventDefault();

    exercise = $("#exercise-name-input").val().trim();
    duration = $("#exercise-duration-input").val().trim();
    burnCalorie = $("#exercise-cals-burned-input").val().trim();
    //sampleVideo = $("#Video-input").val().trim();

    database.ref().set({
        exercise: exercise,
        duration: duration,
        burnCalorie: burnCalorie,
        sampleVideo: sampleVideo
    });
});

database.ref().on("value", function (record) {


    $("#exercise-name").text(record.val().exercise);
    $("#exercise-duration").text(record.val().duration);
    $("#exercise-cals-burned").text(record.val().burnCalorie);
    //$("#exercise-video").text(record.val().sampleVideo);

    console.log(record);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
})

console.log("hey");
