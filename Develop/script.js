let today = moment();
let currentTime = identifyCurrentTime();

function identifyCurrentTime () {
  currentHour = today.format("HH");
  console.log(currentHour);
};

//every minute trigger check what the current time is
function updateCurrentTimeTimer () {
  setInterval(identifyCurrentTime, 60000);
};

//colour code time blocks for past/present/future events
function colourCodeTimeBlocks () {
  console.log("hello")
  // turn html elements into an array
  //const blockTime = $("#blockTime").attr("data-time");
  // if time block attr is less than current time add class .past

  // else if time block attr is equal to current time then add class current

  // else add class future
};

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  //$('.row').each(colourCodeTimeBlocks());
};

$("document").ready(populatePageInformation);