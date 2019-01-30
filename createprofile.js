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
  
  //*******************************index html*************************/
  $("#createprofile").on("click", function(event){
  
      
      event.preventDefault();
      var gender
var radios = document.getElementsByName('gender');

for (var i = 0, length = radios.length; i < length; i++)
{
 if (radios[i].checked)
 {
  // do whatever you want with the checked radio
 gender =radios[i].value;
 console.log(gender);

  // only one radio can be logically checked, don't check the rest
  break;
 }
};
    
      //get nutrion input data
      gender;
      var userage = $("#user-age").val().trim();
      var userage = $("#user-age").val().trim();
      var userweight = $("#user-weight").val().trim();
      var userheightfeet = $("#user-height-feet").val().trim();
      var userheightinches = $("#user-height-inches").val().trim();
      
       var createprolife ={
        gender:gender,
        userage:userage,
        userweight: userweight,
        userheightfeet:userheightfeet,
        userheightinches:userheightinches
         };
      
      dataRef.ref("test2").push(createprolife)
      $("#user-age").val("");
    $("#user-weight").val("");
    $("#user-height-feet").val("");
    $("#fat-input").val("");
    $("#carbs-input").val("");
    $("#user-height-inches").val("");
  });
  