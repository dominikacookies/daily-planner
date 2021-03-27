var today = moment();

function populatePageInformation () {
  populateDayInformation ();
  startTimer ();
  currentTime = identifyCurrentTime ();
  colourCodeTimeBlocks ();
};

function populateDayInformation () {
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
};

function startTimer () {
  setInterval(identifyCurrentTime, 60000);
;}

function identifyCurrentTime () {
  //every x time update current time
  console.log("time")
};

function colourCodeTimeBlocks () {
  console.log("hello")
  // turn html elements into an array
  //var blockTime = $("#blockTime").attr("data-time");
  // if time block attr is less than current time add class .past

  // else if time block attr is equal to current time then add class current

  // else add class future
};

$("document").ready(populatePageInformation);