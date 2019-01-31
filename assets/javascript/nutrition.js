//Nutritionix API: 68bd18dff81e4268ce3dd68b02a4f509

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

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
var nutrReference = dataRef.ref("/" + uid + "/nutrition");
var totalCal = 0;
var breakfastCal = 0;
var lunchCal = 0;
var dinnerCal = 0;
var currentDate = moment().format("YYYY-MM-DD");

//Form Validation
var validateNutritionForm = function(nutrition){

  if(!nutrition.food || 
     !nutrition.serving || 
     !nutrition.calories || 
     !nutrition.fat || 
     !nutrition.carbs || 
     !nutrition.protein || 
     !nutrition.meal || 
     !nutrition.currentTime || 
     isNaN(nutrition.serving) ||
     isNaN(nutrition.calories) ||
     isNaN(nutrition.fat) ||
     isNaN(nutrition.carbs) ||
     isNaN(nutrition.protein)) {
    $("#validation-text").show();
    console.log("Form Failed"); // add modal or look into (jQuery.after) to tell user input is incorrect 
  } else {
    dataRef.ref().push(nutrition)
    $("#food-input").val("");
    $("#serving-input").val("");
    $("#cal-input").val("");
    $("#fat-input").val("");
    $("#carbs-input").val("");
    $("#protein-input").val("");
  }
}

//button to nutrition data
$("#add-nutrition-btn").on("click", function(event){
  
  event.preventDefault();

  $("#validation-text").hide();

  //get nutrion input data
  var food = $("#food-input").val().trim();
  var serving = $("#serving-input").val().trim();
  var calories = $("#cal-input").val().trim();
  var fat = $("#fat-input").val().trim();
  var carbs = $("#carbs-input").val().trim();
  var protein = $("#protein-input").val().trim();
  var meal = $("#meal-input").val().trim();
  if(meal === "Choose Meal..."){
    meal = "";
  }
  var entryTime = moment().format("YYYY-MM-DD HH:mm");
  var entryDate = moment().format("YYYY-MM-DD");



  console.log(food);
  console.log(serving);
  console.log(calories);
  console.log(fat);
  console.log(carbs);
  console.log(protein);
  console.log(meal);
  console.log(entryTime);
  console.log(entryDate);

  //Creates local "temporary" object for holding train data
  var NutritionFact ={
    food: food,
    serving: serving,
    fat:fat,
    calories: calories,
    carbs: carbs,
    protein: protein,
    meal: meal,
    entryDate: entryDate,
    entryTime: entryTime
  };

  validateNutritionForm(NutritionFact);
});

var appendTable = function(foodObject){
  var nutritionRow = $("<tr>").append(

    $("<td>").text(foodObject.food),
    $("<td>").text(foodObject.serving),
    $("<td>").text(foodObject.calories),
    $("<td>").text(foodObject.fat),
    $("<td>").text(foodObject.carbs),
    $("<td>").text(foodObject.protein),
  )
 
  switch(foodObject.meal){
    case "breakfast":
      breakfastCal += parseInt(foodObject.calories);
      $("#breakfast-table > tbody").append(nutritionRow);
      break;

    case "lunch":
      lunchCal += parseInt(foodObject.calories);
      $("#lunch-table > tbody").append(nutritionRow);
      break;

    case "dinner":
      dinnerCal += parseInt(foodObject.calories);
      $("#dinner-table > tbody").append(nutritionRow);
      break;
  }

  $("#nutrition-table > tbody").append(nutritionRow);
  totalCal += parseInt(foodObject.calories);
  $("#total-cal").text(totalCal);
  
}
  
// Create Firebase event for adding nutrition to a row in the html when a user adds an entry
dataRef.ref("/nutrition").on("child_added", function(childSnapshot) {

  if(currentDate)
  var foodObject = childSnapshot.val();
  var initDate = moment(foodObject.entryTime, "YYYY-MM-DD");
  var currentTime = moment();
  var convCurrTime = moment(currentTime, "YYYY-MM-DD");
  var dateDiff = convCurrTime.diff(initDate, "days");
  if(dateDiff < 8){
    appendTable(foodObject);
  }
});


// Function to hide and show tables based on what the user selects in the meal-output select element on the HTML
$("#meal-output").on("click", function(){

  var selection = $(this).val().trim();

  switch(selection) {

    case "breakfast": 
      $("#breakfast-table").show();
      $("#nutrition-table").hide();
      $("#lunch-table").hide();
      $("#dinner-table").hide();
      $("#total-cal").text(breakfastCal);
      break;

    case "lunch": 
      $("#lunch-table").show();
      $("#nutrition-table").hide();
      $("#breakfast-table").hide();
      $("#dinner-table").hide();
      $("#total-cal").text(lunchCal);
      break;

    case "dinner": 
      $("#dinner-table").show();
      $("#nutrition-table").hide();
      $("#breakfast-table").hide();
      $("#lunch-table").hide();
      $("#total-cal").text(dinnerCal);
      break;

    default:
    $("#nutrition-table").show();
    $("#breakfast-table").hide();
    $("#lunch-table").hide();
    $("#dinner-table").hide();
    $("#total-cal").text(totalCal);
    break;
  }
});

$("#nutrition-table").show();
$("#breakfast-table").hide();
$("#lunch-table").hide();
$("#dinner-table").hide();