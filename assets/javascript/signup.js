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

var currentUser;

$("#sign-up-btn").on("click", function(event){

    event.preventDefault();

    var email = $("#inputEmail").val().trim();
    //var firstName = $("#firstName").val().trim();
    //var lastName = $("#lastName").val().trim();
    // var username = $("#userName").val().trim();
    var password = $("#password").val().trim();
    var confirmPass = $("#passwordConfirm").val().trim();

    console.log(email, password, confirmPass);

    if(email && password && confirmPass && confirmPass === password){
        
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              currentUser = user;
              console.log(user);
              uid = user.uid;
              console.log(uid);
              document.cookie = "uid=" + uid  + ";";
              console.log(document.cookie)
            } else {
              console.log("Log In Failed");
            }
          });

        //window.location.href = "createprofile.html";
        

    } else {

        console.log("Create user failed");
    }
    
});