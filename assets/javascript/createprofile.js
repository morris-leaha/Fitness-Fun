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

var uid = sessionStorage.getItem("uid");
console.log(uid);
var dataRef = firebase.database();
var profileRef = uid + "/profile"

$("#createprofile").on("click", function (event) {


  event.preventDefault();
  var gender;
  var radios = document.getElementsByName('gender');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      gender = radios[i].value;
      console.log(gender);

      // only one radio can be logically checked, don't check the rest
      break;
    }
  };

  //get user input data
  var userfirstname = $("#firstName").val().trim();
  var userlastname = $("#lastName").val().trim();
  var userage = $("#user-age").val().trim();
  var userweight = $("#user-weight").val().trim();
  var usergoalweight = $("#user-goal-weight").val().trim();
  var userheightfeet = $("#user-height-feet").val().trim();
  var userheightinches = $("#user-height-inches").val().trim();
  var userActivityLevel = $("#activityView").val();

  var createprofile = {
    firstName: userfirstname,
    lastName: userlastname,
    gender: gender,
    userage: userage,
    userweight: userweight,
    usergoalweight: usergoalweight,
    userheightfeet: userheightfeet,
    userheightinches: userheightinches,
    useractivitylevel: userActivityLevel,
  };

  dataRef.ref(profileRef).push(createprofile);

  // clearing input fields 
  $("#firstName").val("");
  $("#lastName").val("");
  $("#user-age").val("");
  $("#user-weight").val("");
  $("#user-goal-weight").val("");
  $("#user-height-feet").val("");
  $("#user-height-inches").val("");

  // redirecting user to dashboard.html after 
  window.location.href = "dashboard.html";
})

$("#sign-out").on("click", function(){

  firebase.auth().signOut().then(function() {
      sessionStorage.clear();
      window.location.href = "index.html";
  }, function(error){
      console.log("Sign Out Error", error);
  });
});
<<<<<<< HEAD
=======

$("#navbar-links").hide();
$("#user-dropdown").hide();
>>>>>>> 2f1d95410ea5fbbf77540a1dc4a51f5bb38bb4cb
