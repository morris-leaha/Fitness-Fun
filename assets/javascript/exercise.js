// Initialize Firebase
var config = {
    apiKey: "AIzaSyCLBbtHm6JZPr2nfF14PQ-NrOKtpg-oQu0",
    authDomain: "exercise-e5e02.firebaseapp.com",
    databaseURL: "https://exercise-e5e02.firebaseio.com",
    projectId: "exercise-e5e02",
    storageBucket: "",
    messagingSenderId: "1089651556569"
};
firebase.initializeApp(config);

var dataRef = firebase.database();



$(".add-exercise").on("click", function (event) {
    event.preventDefault();

    var exercise = $("#exercise-name-input").val().trim();
    var duration = $("#exercise-duration-input").val().trim();
    var burnCalorie = $("#exercise-cals-burned-input").val().trim();
  
    var exerciseData = {
        exercise: exercise,
        duration: duration,
        burnCalorie: burnCalorie
    };

    dataRef.ref().push(exerciseData)

    $("#exercise-name-input").val("");
    $("#exercise-duration-input").val("");
    $("#exercise-cals-burned-input").val("");
});

 
dataRef.ref().on('child_added', function (snapshot) {

    var exerciseData = snapshot.val().exercise;
    var durationData = snapshot.val().duration;
    var burnCalorieData = snapshot.val().burnCalorie;

    var exerciseRow = $("<tr class='tr-center'>").append(
        $("<td>").text(exerciseData),
        $("<td>").text(durationData),
        $("<td>").text(burnCalorieData),
    );

    $("#exercise-table > tbody").append(exerciseRow);

});

$("#search-submit").on("click", function () {
    
});



