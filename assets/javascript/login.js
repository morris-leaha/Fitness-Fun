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
  $("#login").on("click", function(event){
  
      
      event.preventDefault();
    
      //get nutrion input data
      var username = $("#userName").val().trim();
      var password = $("#password").val().trim();
      var uniqueID = username+password;
      console.log(uniqueID);
      var loginInfo ={
        username:username,
        password: password
        
      };
      
      dataRef.ref(uniqueID).push(loginInfo)
  })