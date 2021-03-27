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
};

$("document").ready(populatePageInformation);