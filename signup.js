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

// event listener to add new user information to FB DB
$("#sign-up-btn").on("click", function(event){
  
    event.preventDefault();
  
    // store input in variables
    
    var firstName = $("#firstName").val().trim();
    var lastName = $("#lastName").val().trim();
    var email = $("#inputEmail").val().trim();
    // var username = $("#userName").val().trim();
    var password = $("#password").val().trim();
  
    // Creates local "temporary" object for holding data
    var newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    dataRef.ref().push(newUser);

    // clear input fields
    $("#firstName").val("");
    $("#lastName").val("");
    $("#inputEmail").val("");
    $("#password").val("");
    $("#passwordConfirm").val("");

    // redirect to createprofile.html after
    window.location.href = "createprofile.html";
   
  });