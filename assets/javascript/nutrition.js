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
var nutrRef = uid + "/nutrition";
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

  //get nutrition input data
  var food = $("#food-input").val().trim();
  var serving = $("#serving-input").val().trim();
  var calories = $("#cal-input").val().trim();
  var fat = $("#fat-input").val().trim();
  var carbs = $("#carbs-input").val().trim();
  var protein = $("#protein-input").val().trim();
  var entryTime = moment().format("YYYY-MM-DD HH:mm");
  console.log(entryTime);



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

var updateTotalCals = function(cals, time){

  var totalCals = cals;
  var entryTime = time;
  dataRef.ref(uid).once("value", function(snapshot){
    if(!snapshot.hasChild("total-cals")){
      dataRef.ref(uid + "/total-cals/" + entryTime).push(totalCals);
      console.log("New branch attempted...")
    } else {
      dataRef.ref(uid + "/total-cals").once("value", function(snapshot){
        if(!snapshot.hasChild(entryTime)){
          dataRef.ref(uid + "/total-cals/" + entryTime).push({totalCals: totalCals});
        } else {
          dataRef.ref(uid + "/total-cals/").child(entryTime).update({totalCals});
        }
      })
    }
  })
}

var appendTable = function(foodData, entryTime){

  var foodObject = foodData;
  totalCal += parseInt(foodObject.calories);
  
  var nutritionRow = $("<tr>");
  var foodLabel = $("<td>").text(foodObject.food);
  var servingsLabel = $("<td>").text(foodObject.serving);
  var caloriesLabel = $("<td>").text(foodObject.calories);
  var fatLabel = $("<td>").text(foodObject.fat);
  var carbsLabel = $("<td>").text(foodObject.carbs);
  var proteinLabel = $("<td>").text(foodObject.protein);
  nutritionRow.append(foodLabel, servingsLabel, caloriesLabel, fatLabel, carbsLabel, proteinLabel);
  
  $("#nutrition-body").append(nutritionRow);
  $("#total-cal").text(totalCal);
  updateTotalCals(totalCal, entryTime);
}
  
// Create Firebase event for adding nutrition to a row in the html when a user adds an entry
dataRef.ref(nutrRef).on("child_added", function(snapshot) {
  //snapshot.forEach(function(childSnapshot){
    var foodObject = snapshot.val();
    //console.log(foodObject);
    var entryTimeConv = moment(foodObject.entryTime).format("YYYY-MM-DD");
    console.log(entryTimeConv);
    var currentTime = moment().format("YYYY-MM-DD");
    //var currentTimeConv = moment(currentTime, "DD/MM/YYYY");
    console.log(currentTime);
    //var dateDiff = currentTime.diff(entryTimeConv, "days");
    //console.log(dateDiff);

    //console.log(dateDiff);

    if(entryTimeConv === currentTime){
      appendTable(foodObject, entryTimeConv);
    }
  //});
});