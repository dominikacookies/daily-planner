today = moment();
currentTime = identifyCurrentTime();

function identifyCurrentTime () {
  currentHour = today.format("HH");
  return currentHour;
};

//every minute trigger check what the current time is
function updateCurrentTimeTimer () {
  setInterval(identifyCurrentTime, 60000);
};

//colour code time blocks for past/present/future events
function colourCodeTimeBlocks () {
  $(".row").each(function() {
    let blockTime = $(this).children(".hour").attr("data-time");
    console.log(blockTime);
    console.log(currentTime);
  
    if (blockTime == currentTime) {
      $(this).children("textarea").addClass("present");
    } else if (blockTime < currentTime) {
      $(this).children("textarea").addClass("past");
    } else {
      $(this).children("textarea").addClass("future");
    };
  });
};

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  colourCodeTimeBlocks();
};

$("document").ready(populatePageInformation);