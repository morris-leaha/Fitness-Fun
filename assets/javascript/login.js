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
$("#login-btn").on("click", function(event){

  console.log("Log In Button Clicked");

  event.preventDefault();

  var email = $("#email-login").val().trim();
  var password = $("#password-login").val().trim();

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUser = user;
        console.log(user);
        uid = user.uid;
        console.log(uid);
        sessionStorage.setItem("uid", uid);    
        console.log(sessionStorage.getItem("uid"));
        window.location.href = "dashboard.html"
      }
    });
  }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
  });
});

$("#main-navbar").hide();
$("#user-dropdown").hide();