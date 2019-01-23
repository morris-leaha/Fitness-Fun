var config = {
    apiKey: "AIzaSyDwS4xQfgKS5DAseUeQ7umkQOO3SaJGhbU",
    authDomain: "fitness-tracker-bce35.firebaseapp.com",
    databaseURL: "https://fitness-tracker-bce35.firebaseio.com",
    projectId: "fitness-tracker-bce35",
    storageBucket: "fitness-tracker-bce35.appspot.com",
    messagingSenderId: "725491096361"
  };

firebase.initializeApp(config);

$("#sign-up-btn").on("click", function(event){

    event.preventDefault();

    var email = $("#inputEmail4").val().trim();
    var firstName = $("#firstName").val().trim();
    var lastName = $("#lastName").val().trim();
    var username = $("#userName").val().trim();
    var password = $("#password").val().trim();
    var confirmPass = $("#passwordConfirm").val().trim();

    console.log(email, firstName, lastName, username, password, confirmPass);

    if(email && username && firstName && lastName && password && confirmPass && confirmPass === password){
        
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMaster);
        });
    } else {

        console.log("Create user failed");
    }
    
});