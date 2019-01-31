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

//Form Validation
var validateNutritionForm = function(nutrition){

  if(!nutrition.classification ||
     !nutrition.food || 
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
  var classification = "nutrition";
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
  var currentTime = moment().format("YYYY-MM-DD HH:mm Z");



  console.log(food);
  console.log(classification);
  console.log(serving);
  console.log(calories);
  console.log(fat);
  console.log(carbs);
  console.log(protein);
  console.log(meal);
  console.log(currentTime);
  //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //Creates local "temporary" object for holding train data
  var NutritionFact ={
    classification: classification,
    food: food,
    serving: serving,
    fat:fat,
    calories: calories,
    carbs: carbs,
    protein: protein,
    meal: meal,
    currentTime: currentTime
  };

  validateNutritionForm(NutritionFact);

  // $("#food-input").val("");
  // $("#serving-input").val("");
  // $("#cal-input").val("");
  // $("#fat-input").val("");
  // $("#carbs-input").val("");
  // $("#protein-input").val("");

});
  
//. Create Firebase event for adding nutrion to a row in the html when a user adds an entry
dataRef.ref().on("child_added", function(childSnapshot) {
  //console.log(childSnapshot.val());

  var fooddb = childSnapshot.val().food;
  var servingdb = childSnapshot.val().serving;
  var caloriesdb = childSnapshot.val().calories;
  var fatdb = childSnapshot.val().fat;
  var carbsdb = childSnapshot.val().carbs;
  var proteindb = childSnapshot.val().protein;


  // Create the new row
  if(childSnapshot.val().classification === "nutrition"){
    var nutritionRow = $("<tr>").append(

      $("<td>").text(fooddb),
      $("<td>").text(servingdb),
      $("<td>").text(caloriesdb),
      $("<td>").text(fatdb),
      $("<td>").text(carbsdb),
      $("<td>").text(proteindb),
    );

    // Append the new row to the table
    $("#nutrition-table > tbody").append(nutritionRow);
  }

  if(childSnapshot.val().classification === "nutrition" && childSnapshot.val().meal === "breakfast"){
    var nutritionRow = $("<tr>").append(

      $("<td>").text(fooddb),
      $("<td>").text(servingdb),
      $("<td>").text(caloriesdb),
      $("<td>").text(fatdb),
      $("<td>").text(carbsdb),
      $("<td>").text(proteindb),
    );

    // Append the new row to the table
    $("#breakfast-table > tbody").append(nutritionRow);
  }

  if(childSnapshot.val().classification === "nutrition" && childSnapshot.val().meal === "lunch"){
    var nutritionRow = $("<tr>").append(

      $("<td>").text(fooddb),
      $("<td>").text(servingdb),
      $("<td>").text(caloriesdb),
      $("<td>").text(fatdb),
      $("<td>").text(carbsdb),
      $("<td>").text(proteindb),
    );

    // Append the new row to the table
    $("#lunch-table > tbody").append(nutritionRow);
  }

  if(childSnapshot.val().classification === "nutrition" && childSnapshot.val().meal === "dinner"){
    var nutritionRow = $("<tr>").append(

      $("<td>").text(fooddb),
      $("<td>").text(servingdb),
      $("<td>").text(caloriesdb),
      $("<td>").text(fatdb),
      $("<td>").text(carbsdb),
      $("<td>").text(proteindb),
    );

    // Append the new row to the table
    $("#dinner-table > tbody").append(nutritionRow);
  }
});

$("#meal-output").on("click", function(){

  var selection = $(this).val().trim();
  console.log(selection);

  switch(selection) {

    case "breakfast": 
      $("#breakfast-table").show();
      $("#nutrition-table").hide();
      $("#lunch-table").hide();
      $("#dinner-table").hide();
      break;

    case "lunch": 
      $("#lunch-table").show();
      $("#nutrition-table").hide();
      $("#breakfast-table").hide();
      $("#dinner-table").hide();
      break;

    case "dinner": 
      $("#dinner-table").show();
      $("#nutrition-table").hide();
      $("#breakfast-table").hide();
      $("#lunch-table").hide();
      break;

    default:
    $("#nutrition-table").show();
    $("#breakfast-table").hide();
    $("#lunch-table").hide();
    $("#dinner-table").hide();
    break;
  }
});

$("#breakfast-table").hide();
$("#lunch-table").hide();
$("#dinner-table").hide();