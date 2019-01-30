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
var validateNutritionForm = function(nutrition){

  if(!nutrition.classification ||
     !nutrition.food || 
     !nutrition.serving || 
     !nutrition.calories || 
     !nutrition.fat || 
     !nutrition.carbs || 
     !nutrition.protein || 
     !nutrition.meal || 
     !nutrition.currentTime) {
    console.log("Form Failed");
  } else {
    dataRef.ref().push(nutrition);

    // clearing input fields
    $("#food-input").val("");
    $("#serving-input").val("");
    $("#cal-input").val("");
    $("#fat-input").val("");
    $("#carbs-input").val("");
    $("#protein-input").val("");
  }
}

// button to nutrition data
$("#add-nutrion-btn").on("click", function(event){
  
  event.preventDefault();

  // get nutrition input data
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

  // Creates local "temporary" object for holding data
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
  
// Create Firebase event for adding nutrition to a row in the html when a user adds an entry
dataRef.ref().on("child_added", function(childSnapshot) {
  //console.log(childSnapshot.val());

  var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
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