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
var uid = sessionStorage.getItem("uid");
var exerciseRef = "/" + uid + "/exercise";
//console.log(exerciseRef);
var profileRef = "/" + uid + "/profile";
//console.log(profileRef);
var userWeight;

var calsPerExercise = {};

//Get User's weight
dataRef.ref(profileRef).on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot.val());
        userWeight = childSnapshot.val().userweight;
        //console.log(userWeight);    
    });
});

//Form Validation
var validateExerciseForm = function (exercise) {

    if (!exercise.exercisename ||
        !exercise.exerciseduration ||
        !exercise.calsBurn ||
        !exercise.exercisecurrentTime
    ) {
        //console.log("Form Failed");
    } else {
        dataRef.ref(exerciseRef).push(exercise)
        $("#exercise-name-input").val("");
        $("#exercise-duration-input").val("");
        // $("#exercise-cals-burned-input").val("");
    }
}
// adding exercise to table 
$("#add-exercise-btn").on("click", function (event) {
    event.preventDefault();
    // get input data
    var exercisename = $(".exercise-name-input option:selected").val();
    var exerciseMet = $(".exercise-name-input option:selected").attr("data-met");
    console.log(exerciseMet)
    var exerciseduration = $("#exercise-duration-input").val().trim();
    var exercisecurrentTime = moment().format("YYYY-MM-DD HH:mm Z");


    //Met value formula.
    var calsBurn = Math.round(exerciseMet * (exerciseduration / 60) * (userWeight / 2.2));
    console.log(calsBurn);

    // console.log(exercisename);
    // console.log(exerciseduration);
    // console.log(exercisecurrentTime);
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Creates local "temporary" object for holding data
    var exerciseInfo = {
        exercisename: exercisename,
        exerciseduration: exerciseduration,
        calsBurn: calsBurn,
        exercisecurrentTime: exercisecurrentTime
    };

    validateExerciseForm(exerciseInfo);
});

// Create Firebase event for adding to a row in the html when a user adds an entry
dataRef.ref(exerciseRef).on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var exercisedurationdb = childSnapshot.val().exerciseduration;
    var calsBurndb = childSnapshot.val().calsBurn;
    var exercisenamedb = childSnapshot.val().exercisename;


    
    // Create the new row

    var exerciseRow = $("<tr>").append(

        $("<td>").text(exercisenamedb),
        $("<td>").text(exercisedurationdb),
        $("<td>").text(calsBurndb),
    );

    //console.log(exerciseRow);

    // Append the new row to the table
    $("#exercise-table > tbody").append(exerciseRow);


});

var pageToken = "";


$(document).ready(function() {

    $(".popup").hide();
    $(".overlayBg").hide();
     
    $("#search-submit").click(function(){
    
        searchYoutube();
        
    });

    $(".tokenClass").click(function(){

    })

});

$(".overlayBg").click(function(){
    $(".popup").hide();
    $(".overlayBg").hide();
})

$("#output").on("click",".thumbnail", function(){
    $(".popup").show();
    $(".overlayBg").show();
    $(window).scrollTop(0);
    
    $(".popup iframe").attr("src","https://www.youtube.com/embed/"+$(this).attr('videoID'));
})
    


function searchYoutube(){

    $.ajax({
        url:"https://www.googleapis.com/youtube/v3/search",
        dataType:'json',
        type:'GET',
        data:{
            key:'AIzaSyAZJ-ZKG8sb46Z8nFK39RBtpZGqmjEWdOA',
            q: $("#search-input").val(),
            part:'snippet',
            maxResults:5,
            pageToken: pageToken.current
        }
    }).done(function(data){
        pageToken.nextPage = data.nextPageToken;
        pageToken.prevPage = data.prevPageToken;
        var html = "";

        $.each(data["items"],function(index,value){

            html += '<div><div class="title">' + value.snippet.title + '</div>';
            html += '<div><div class="url"><a href="https://www.youtube.com/watch?v=' + value.id.videoId +'" target="_blank">' + value.id.videoId + '</a></div>';
            html += '<div><img class="thumbnail" src="'+value.snippet.thumbnails.medium.url+'" videoID="'+value.id.videoId+'"></div>';
            html += '</div>';

            
        })
        $("#output").html(html);
    });
};

$("#sign-out").on("click", function(){

    firebase.auth().signOut().then(function() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }, function(error){
        console.log("Sign Out Error", error);
    });
});

$("#sign-in").hide();
$("#sign-up").hide();