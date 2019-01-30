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