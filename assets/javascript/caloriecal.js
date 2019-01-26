$(document).ready(function () {

    var gender;
    var age;
    var currentWeight;
    var heightFeet;
    var heightInches;

    $("#submit-profile").on("click", function (event) {
        event.preventDefault();
        gender = $("input[name=gender]:checked").val();
        age = $("#user-age").val().trim();
        currentWeight = $("#user-weight").val().trim();
        heightFeet = $("#user-height-feet").val().trim();
        heightInches = $("#user-height-inches").val().trim();
        console.log(gender);
        console.log(age);
        console.log(currentWeight);
        console.log(heightFeet);
        console.log(heightInches);

        var convertedWeight = (currentWeight / 2.205);
        console.log("Weight in kgs: " + convertedWeight);

        var convertedHeightInches = ((heightFeet * 12) + parseInt(heightInches));
        console.log("Height in inches: " + convertedHeightInches);

        var convertedHeightCentimeters = (convertedHeightInches * 2.54);
        console.log("Height in cms: " + convertedHeightCentimeters);


        if (gender === "male") {
            var maleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * age) + 5));
            console.log("Male current BMR: " + maleBMR);
        }
        else if (gender === "female") {
            var femaleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * age) - 161));
            console.log("Female current BMR: " + femaleBMR);
        }

    });




})



