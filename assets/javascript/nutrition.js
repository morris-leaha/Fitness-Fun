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

  //Creates local "temporary" object for holding data
  var NutritionFact = {
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

var initTotalCals = function(firstChild, firstValue) {
  
  var initRef = firstChild;
  var initCals = firstValue;
  dataRef.ref(uid + "/total-cals/" + initRef).push({totalCals: initCals});
  for(i = 1; i < 7; i++){
    dateRef = moment().subtract(i, "days").format("YYYY-MM-DD");
    dataRef.ref(uid + "/total-cals/" + dateRef).update({totalCals: 0})
  }


}

var updateTotalCals = function(cals, time){

  var totalCals = cals;
  var entryTime = time;
  dataRef.ref(uid).once("value", function(snapshot){
    if(!snapshot.hasChild("total-cals")){
      initTotalCals(entryTime, totalCals);
    } else {
      dataRef.ref(uid + "/total-cals").once("value", function(snapshot){
        if(!snapshot.hasChild(entryTime)){
          dataRef.ref(uid + "/total-cals/" + entryTime).update({totalCals: totalCals});
        } else {
          dataRef.ref(uid + "/total-cals/" + entryTime).update({totalCals});
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

var foodNutApi;

//this will create a button for everey item that the API search return, and it will allow the user 
//to pick an optiom i am still working on this.
$("#search-submit-button").on("click", function (NutApi) {
  foodNutApi = $("#search-submit").val().trim();
  //console.log(brandnameAPI);
  var queryURL = "https://apibeta.nutritionix.com/v2/search?q=" + foodNutApi + "&limit=10&offset=0&search_type=grocery&search_nutrient=protein&appId=335df410&appKey=d2efad6ca3d21cd2057d59f8b895cc14";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (i = 0; i < 5; i++) {
      var brandnameAPI = response.results[i].item_name;
      console.log(brandnameAPI);

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("Api-Name-btn");
      // Adding a data-attribute
      a.attr("data-name", brandnameAPI);
      a.attr("id", "ApiNamebtn")
      // Providing the initial button text
      a.text(brandnameAPI);
      // Adding the button to the buttons-view div
      $("#API-button").append(a);
    }

  })

});

//this is done it brings back information from tnutrionix and appended to the database.
//i nedd to get the button part above working so i can join the two togerther
//and merge it with the nutrion code together.

// info from API protein
$(document).on("click", ".Api-Name-btn", function (NutApi) {
  NutApi.preventDefault();

  foodNutApiopt = $(this).attr("data-name");
  console.log(foodNutApiopt);
  nutrionApiArray = ["protein", "fat", "carb", "calories"];
  var queryURL;
  var itemnameAPIarray = [];
  var nutrientnameApiArray = [];
  var valueAPIarray = [];
  var currentTimeAPI = moment().format("YYYY-MM-DD HH:mm Z");
  var proteinvalue;
  var carbvalue;
  var fatvalue;
  var caloriesvalue;
  var foodvalue;

  /*console.log(nutrientnameApiArray);
  console.log(itemnameAPIarray);
  console.log(valueAPIarray);*/



  for (var i = 0; i < nutrionApiArray.length; i++) {
    queryURL = "https://apibeta.nutritionix.com/v2/search?q=" + foodNutApiopt + "&limit=10&offset=0&search_type=grocery&search_nutrient=" + nutrionApiArray[i] + "&appId=335df410&appKey=d2efad6ca3d21cd2057d59f8b895cc14";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var itemnameAPI = response.results[0].item_name;
      var nutrientnameApi = response.results[0].nutrient_name;
      var ProteivalueAPI = response.results[0].nutrient_value;
      itemnameAPIarray.push(itemnameAPI);
      nutrientnameApiArray.push(nutrientnameApi);
      valueAPIarray.push(ProteivalueAPI);

      proteinvalue = valueAPIarray[0];
      carbvalue = valueAPIarray[1];
      fatvalue = valueAPIarray[2];
      caloriesvalue = valueAPIarray[3];
      foodvalue = itemnameAPIarray[0];

      console.log(proteinvalue);
      console.log(carbvalue);
      console.log(fatvalue);
      console.log(caloriesvalue);
      console.log(foodvalue);


      /*console.log(response.results[0].item_name);
      console.log(response.results[0].nutrient_name);
      console.log(response.results[0].nutrient_value);*/

      /*    var NutritionApi ={
             food: ProteinbrandnameAPI,
              ProteinnameApi: ProteinnameApi,
              protein: ProteivalueAPI,
              currentTimeAPI:currentTimeAPI
               }
          // console.log(response.results[0].nutrient_value);
         //}
         dataRef.ref("test5").push(NutritionApi)*/
    }).then(function (response) {

      var NutritionApi = {
        food: foodvalue,
        fat: fatvalue,
        calories: caloriesvalue,
        carbs: carbvalue,
        protein: proteinvalue,
        entryTime: currentTimeAPI
      }
      // console.log(response.results[0].nutrient_value);
      //}
      dataRef.ref(nutrRef).push(NutritionApi);

    });
  }
});

  // Create Firebase event for adding nutrition to a row in the html when a user adds an entry
  dataRef.ref(nutrRef).on("child_added", function (snapshot) {
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

    if (entryTimeConv === currentTime) {
      appendTable(foodObject, entryTimeConv);
    }
});

$("#sign-out").on("click", function(){

  firebase.auth().signOut().then(function() {
      sessionStorage.clear();
      window.location.href = "index.html";
  }, function(error){
      console.log("Sign Out Error", error);
  });
});

$("#sign-in").hide();
$("#sign-up").hide();