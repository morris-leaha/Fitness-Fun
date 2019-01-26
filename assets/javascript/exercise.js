  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfTB-G-lr6L_FFFdS3x-0sKwmVUUZhaBI",
    authDomain: "nutrition-70662.firebaseapp.com",
    databaseURL: "https://nutrition-70662.firebaseio.com",
    projectId: "nutrition-70662",
    storageBucket: "nutrition-70662.appspot.com",
    messagingSenderId: "602412115127"
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
