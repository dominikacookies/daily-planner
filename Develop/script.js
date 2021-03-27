var today = moment();
$("#currentDay").text(today.format("Do [of] MMM YYYY"));

var currentTime = moment().format('HH');
console.log(currentTime)