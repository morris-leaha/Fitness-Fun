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
var currentDate = moment().format("YYYY-MM-DD");

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

    dataRef.ref("/nutrition").push(nutrition);

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
  var entryDay = moment().format("YYYY-MM-DD");



  console.log(food);
  console.log(classification);
  console.log(serving);
  console.log(calories);
  console.log(fat);
  console.log(carbs);
  console.log(protein);
  console.log(meal);
  console.log(currentTime);
  console.log(entryDay);

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
    entryDay: entryDay,
    currentTime: currentTime
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
                      $("#breakfast-table > tbody").append(nutritionRow);
                      break;

    case "lunch":
                  $("#lunch-table > tbody").append(nutritionRow);
                  break;

    case "dinner":
                    $("#dinner-table > tbody").append(nutritionRow);
                    break;

    default:

  }

  $("#nutrition-table > tbody").append(nutritionRow);
  
}
  
// Create Firebase event for adding nutrition to a row in the html when a user adds an entry
dataRef.ref("/nutrition").on("child_added", function(childSnapshot) {

  var foodObject = childSnapshot.val();
  if(foodObject.entryDay === currentDate){
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

$("#nutrition-table").show();
$("#breakfast-table").hide();
$("#lunch-table").hide();
$("#dinner-table").hide();