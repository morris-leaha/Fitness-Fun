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
console.log(uid);
var profileRef = uid + "/profile"
var nutrRef = uid + "/nutrition"
var exerciseRef  = uid + "/exercise"

var getDateLabel = function(number){

    var label = "";
    switch(number){

        case 0:
            label = "Sun.";
            break;
        
        case 1:
            label = "Mon.";
            break;
        
        case 2:
            label = "Tue."
            break;

        case 3:
            label = "Wed.";
            break;

        case 4:
            label = "Thu.";
            break;

        case 5:
            label = "Fri.";
            break;

        case 6:
            label = "Sat."
            break;
    }

    return label;
}
var getChartDataObj = function(chartDataArray, label, titleText, color){
    

    chartData = {
        label : label,
        titleText: titleText,
        color: color,
        first: {
            label: getDateLabel(chartDataArray[0].label),
            data: chartDataArray[0].data
        },
        second: {
            label: getDateLabel(chartDataArray[1].label),
            data: chartDataArray[1].data
        },
        third: {
            label: getDateLabel(chartDataArray[2].label),
            data: chartDataArray[2].data
        },
        fourth: {
            label: getDateLabel(chartDataArray[3].label),
            data: chartDataArray[3].data
        },
        fifth: {
            label: getDateLabel(chartDataArray[4].label),
            data: chartDataArray[4].data
        },
        sixth: {
            label: getDateLabel(chartDataArray[5].label),
            data: chartDataArray[5].data
        },
        seventh: {
            label: "Today",
            data: chartDataArray[6].data
        }
    }

    return chartData;
}

var getDates = function() {

    var dates = [];
    for(i = 6; i > -1; i--){
        var date = moment().subtract(i, "days");
        var day = date.day();
        var dateRefString = moment().subtract(i, "days").format("YYYY-MM-DD");
        var dateInfo = {
            dayNumber: day,
            refString: dateRefString
        }

        dates.push(dateInfo)
    }
    
    return dates;
}

var renderChart = function(chartCanvas, chartData) {

    var newChart = new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: [
                chartData.first.label, 
                chartData.second.label, 
                chartData.third.label, 
                chartData.fourth.label, 
                chartData.fifth.label, 
                chartData.sixth.label, 
                chartData.seventh.label
                ],
            datasets: [{
                label: chartData.label,
                data: [
                    chartData.first.data,
                    chartData.second.data,
                    chartData.third.data,
                    chartData.fourth.data,
                    chartData.fifth.data,
                    chartData.sixth.data,
                    chartData.seventh.data
                ],
                backgroundColor: chartData.color
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: chartData.titleText
            },
            legend: {
                display: false,
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}

var getChartData =  function(category){

    var dateInfo = getDates();
    var dataArray = [];
    var chartDataArray = [];
    var chartDataFinal = {};

    var refChild;
    var chartTitle;
    var chartLabel;
    var chartColor;
    var chartID;

    switch(category){
        
        case "nutrition":
            refChild = "total-cals";
            chartTitle = "Daily Calories from Food (Past Week)";
            chartLabel = "Calories";
            chartColor = "#008080";
            chartID = "nutrition-chart";
            break;

        case "exercise":
            refChild = "total-cals-burned";
            chartTitle = "Daily Calories Burned (Past Week)";
            chartLabel = "Calories";
            chartColor = "#cc5500";
            chartID = "exercise-chart";
            break;
    }

    var targetRef = uid + "/" + refChild;
    dataRef.ref(targetRef).once("value", function(snapshot){
        for(i = 0; i < 7; i++){
            var data = snapshot.child(dateInfo[i].refString).val();
            var cals = data.totalCals;
            if(!cals){
                cals = 0;
            }
            dataArray.push(cals);
        }
    }).then(function(){

        for(i = 0; i < 7; i++){
            chartData = {
                label: dateInfo[i].dayNumber,
                data: dataArray[i]
            };
            chartDataArray.push(chartData);
        }
        chartDataFinal = getChartDataObj(chartDataArray, chartLabel, chartTitle, chartColor);
        console.log(chartID);
        var canvas = document.getElementById(chartID).getContext('2d');
        renderChart(canvas, chartDataFinal);
    });
} 

dataRef.ref(profileRef).on("child_added", function (childSnapshot) {

    // grabbing the values from FB DB and storing relavent info in variables
    var userFirstName = childSnapshot.val().firstName;
    $("#nav-username").text(userFirstName);
    var userGender = childSnapshot.val().gender;
    var userAge = childSnapshot.val().userage;
    var userWeight = childSnapshot.val().userweight;
    var userGoalWeight = childSnapshot.val().usergoalweight;
    var userHeightFeet = childSnapshot.val().userheightfeet;
    var userHeightInches = childSnapshot.val().userheightinches;

    // calculating user BMR, or user daily calories
    var convertedWeight = (userWeight / 2.205);

    var convertedHeightInches = ((userHeightFeet * 12) + parseInt(userHeightInches));

    var convertedHeightCentimeters = (convertedHeightInches * 2.54);


    if (userGender === "male") {
        var maleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * userAge) + 5));
        console.log("Male current BMR: " + maleBMR);
        $("#user-dailyCals").text(maleBMR);
    }
    else if (userGender === "female") {
        var femaleBMR = Math.round(((10 * convertedWeight) + (6.25 * convertedHeightCentimeters) - (5 * userAge) - 161));
        console.log("Female current BMR: " + femaleBMR);
        $("#user-dailyCals").text(femaleBMR);
    }
});

//var nutrCanvas = document.getElementById("nutrition-chart").getContext('2d');
//var nutrData = getChartData("total-cals");
//renderChart(nutrCanvas, nutrData);
getChartData("nutrition");