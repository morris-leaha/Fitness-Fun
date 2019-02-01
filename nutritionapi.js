
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

var foodNutApi;

//this will create a button for everey item that the API search return, and it will allow the user 
//to pick an optiom i am still working on this.
$("#search-submit-input").on("click", function(NutApi){
    foodNutApi= $("#search-input").val().trim();
    //console.log(brandnameAPI);
    var queryURL="https://apibeta.nutritionix.com/v2/search?q="+foodNutApi+"&limit=10&offset=0&search_type=grocery&search_nutrient=protein&appId=335df410&appKey=d2efad6ca3d21cd2057d59f8b895cc14";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
for(i=0; i<5; i++){
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
$(document).on("click", ".Api-Name-btn", function(NutApi){
    NutApi.preventDefault();

foodNutApiopt= $(this).attr("data-name");
console.log(foodNutApiopt);
nutrionApiArray =["protein","fat","carb","calories"];
var queryURL;
var itemnameAPIarray=[];
var nutrientnameApiArray=[];
var valueAPIarray =[];
var currentTimeAPI = moment().format("YYYY-MM-DD HH:mm Z");
var proteinvalue;
var carbvalue;
var fatvalue;
var caloriesvalue;
var foodvalue;

/*console.log(nutrientnameApiArray);
console.log(itemnameAPIarray);
console.log(valueAPIarray);*/



for(var i=0; i<nutrionApiArray.length; i++){
queryURL="https://apibeta.nutritionix.com/v2/search?q="+foodNutApiopt+"&limit=10&offset=0&search_type=grocery&search_nutrient="+nutrionApiArray[i]+"&appId=335df410&appKey=d2efad6ca3d21cd2057d59f8b895cc14";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
     var itemnameAPI = response.results[0].item_name;
     var nutrientnameApi=response.results[0].nutrient_name;
     var ProteivalueAPI =response.results[0].nutrient_value;
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
}).then(function(response) {

  var NutritionApi ={
    food: foodvalue,
    fat:fatvalue,
    calories: caloriesvalue,
    carbs: carbvalue,
    protein: proteinvalue,
    entryTime: currentTimeAPI
      }
 // console.log(response.results[0].nutrient_value);
//}
dataRef.ref(nutrRef).push(NutritionApi);
 
})
  }

  dataRef.ref(nutrRef).on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
  
    var fooddb = childSnapshot.val().food;
    var caloriesdb = childSnapshot.val().calories;
    var fatdb = childSnapshot.val().fat;
    var carbsdb = childSnapshot.val().carbs;
    var proteindb = childSnapshot.val().protein;
  
  
    // Create the new row
    
      var nutritionRow = $("<tr>").append(
  
        $("<td>").text(fooddb),
        $("<td>").text(""),
        $("<td>").text(caloriesdb),
        $("<td>").text(fatdb),
        $("<td>").text(carbsdb),
        $("<td>").text(proteindb),
      );
  
      // Append the new row to the table
      $("#nutrition-table > tbody").append(nutritionRow);

$(".Api-Name-btn").remove();
  })
});
