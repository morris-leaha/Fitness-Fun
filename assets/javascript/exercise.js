var config = {
    apiKey: "AIzaSyDwS4xQfgKS5DAseUeQ7umkQOO3SaJGhbU",
    authDomain: "fitness-tracker-bce35.firebaseapp.com",
    databaseURL: "https://fitness-tracker-bce35.firebaseio.com",
    projectId: "fitness-tracker-bce35",
    storageBucket: "fitness-tracker-bce35.appspot.com",
    messagingSenderId: "725491096361"
};

firebase.initializeApp(config);

database = firebase.database();

var exercise = "";
var duration = "";
var burnCalorie = "";
var sampleVideo = "";

$(".add-exercise").on("click", function (event) {
    event.preventDefault();

    exercise = $("#exercise-input").val().trim();
    duration = $("#duration-input").val().trim();
    burnCalorie = $("#calories-input").val().trim();
    sampleVideo = $("#Video-input").val().trim();

    database.ref().set({
        exercise: exercise,
        duration: duration,
        burnCalorie: burnCalorie,
        sampleVideo: sampleVideo
    });
});

database.ref().on("value", function (record) {


    $("#exercise-display").text(record.val().exercise);
    $("#duration-display").text(record.val().duration);
    $("#calories-display").text(record.val().burnCalorie);
    $("#video-display").text(record.val().sampleVideo);

    console.log(record);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
})

console.log("hey");