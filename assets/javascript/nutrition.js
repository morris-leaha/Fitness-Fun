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
var nutrRef = "/" + uid + "/nutrition"
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
     !nutrition.entryTime || 
     isNaN(nutrition.serving) ||
     isNaN(nutrition.calories) ||
     isNaN(nutrition.fat) ||
     isNaN(nutrition.carbs) ||
     isNaN(nutrition.protein)) {
    $("#validation-text").show();
    console.log("Form Failed"); // add modal or look into (jQuery.after) to tell user input is incorrect 
  } else {
    dataRef.ref(nutrRef).push(nutrition)
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
  var entryTime = moment().format("YYYY-MM-DD HH:mm");



  console.log(food);
  console.log(serving);
  console.log(calories);
  console.log(fat);
  console.log(carbs);
  console.log(protein);
  console.log(entryTime);

  //Creates local "temporary" object for holding train data
  var NutritionFact ={
    food: food,
    serving: serving,
    fat:fat,
    calories: calories,
    carbs: carbs,
    protein: protein,
    entryTime: entryTime
  };

  validateNutritionForm(NutritionFact);
});

var appendTable = function(foodData, diff){
  
  console.log("Run");
  var dateDiff = diff;
  var foodObject = foodData;
  var nutritionRow = $("<tr>").append(
    $("<td>").text(foodObject.food),
    $("<td>").text(foodObject.serving),
    $("<td>").text(foodObject.calories),
    $("<td>").text(foodObject.fat),
    $("<td>").text(foodObject.carbs),
    $("<td>").text(foodObject.protein),
  );
  
  // if(dateDiff === 0){
  //   console.log("daily conditional ran")
  //   $("#nutrition-body").append(nutritionRow);
  //   $("#three-day-body").append(nutritionRow);
  // } else if(dataDiff < 4) {
  //   console.log("three day conditional ran");
  //   console.log(nutritionRow);
  //   $("#three-day-body").append(nutritionRow);
  // }
    
  $("nutrition-body").append(nutritionRow);
}
  
// Create Firebase event for adding nutrition to a row in the html when a user adds an entry
dataRef.ref(nutrRef).on("child_added", function(snapshot) {
  //snapshot.forEach(function(childSnapshot){
    var foodObject = snapshot.val();
    console.log(foodObject);
    var entryTimeConv = moment(foodObject.entryTime, "YYYY-MM-DD");
    console.log(entryTimeConv);
    var currentTime = moment();
    var currentTimeConv = moment(currentTime, "YYYY-MM-DD");
    console.log(currentTimeConv);
    //var dateDiff = convCurrTime.diff(initDate, "days");

    //console.log(dateDiff);

    if(entryTimeConv === currentTimeConv){
      //appendTable(foodObject, dateDiff);
      var nutritionRow = $("<tr>").append(
        $("<td>").text(foodObject.food),
        $("<td>").text(foodObject.serving),
        $("<td>").text(foodObject.calories),
        $("<td>").text(foodObject.fat),
        $("<td>").text(foodObject.carbs),
        $("<td>").text(foodObject.protein),
      );
      $("nutrition-body").append(nutritionRow);
    }
  //});
});


// Function to hide and show tables based on what the user selects in the meal-output select element on the HTML
$("#table-select").on("click", function(){

  var selection = $(this).val().trim();

  switch(selection) {

    case "three-day": 
      $("#three-day-table").show();
      $("#nutrition-table").hide();
      $("#one-week-table").hide();
      break;

    case "one-week": 
      $("#one-week-table").show();
      $("#nutrition-table").hide();
      $("#three-day-table").hide();
      break;

    default:
      $("#nutrition-table").show();
      $("#three-day-table").hide();
      $("#one-week-table").hide();
      break;
  }
});

$("#nutrition-table").show();
$("#three-day-table").hide();
$("#one-week-table").hide();