today = moment();
currentTime = identifyCurrentTime();

function identifyCurrentTime () {
  currentHour = today.format("HH");
  console.log(currentHour);
};

//every minute trigger check what the current time is
function updateCurrentTimeTimer () {
  setInterval(identifyCurrentTime, 60000);
};

//colour code time blocks for past/present/future events
//unction colourCodeTimeBlocks () {
  const blockTime = ($(this).data("time"));
  
  //$(".hour").attr("data-time");
  //console.log(blockTime);
  //if (blockTime) {

  //} else if () {

  //} else {

  //}
  // if time block attr is less than current time add class .past

  // else if time block attr is equal to current time then add class current

  // else add class future
//};

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  $(".row").each(function() {
    let blockTime = $(this).children(".hour").attr("data-time");
    console.log(blockTime);
  });
};

$("document").ready(populatePageInformation);