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

  //get nutrition input data
  var userage = $("#user-age").val().trim();
  var userweight = $("#user-weight").val().trim();
  var usergoalweight = $("#user-goal-weight").val().trim();
  var userheightfeet = $("#user-height-feet").val().trim();
  var userheightinches = $("#user-height-inches").val().trim();

  var createprofile = {
    gender: gender,
    userage: userage,
    userweight: userweight,
    usergoalweight: usergoalweight,
    userheightfeet: userheightfeet,
    userheightinches: userheightinches
  };

  dataRef.ref().push(createprofile);

  // clearing input fields 
  $("#user-age").val("");
  $("#user-weight").val("");
  $("#user-goal-weight").val("");
  $("#user-height-feet").val("");
  $("#user-height-inches").val("");
});
