
//Nutritionix API: 68bd18dff81e4268ce3dd68b02a4f509

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
    dataRef.ref().push(nutrition)
    $("#food-input").val("");
    $("#serving-input").val("");
    $("#cal-input").val("");
    $("#fat-input").val("");
    $("#carbs-input").val("");
    $("#protein-input").val("");
  }
}

//button to nutrion data
$("#add-nutrion-btn").on("click", function(event){
  
  event.preventDefault();

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
  //var mealdb = childSnapshot.val().meal;
  console.log(childSnapshot.classification);
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
});