today = moment();
currentTime = identifyCurrentTime();
let eventInfoArray = [];

function identifyCurrentTime () {
  currentHour = today.format("HH");
  return currentHour;
};

//every minute trigger check what the current time is
function updateCurrentTimeTimer () {
  setInterval(identifyCurrentTime, 60000);
};

//colour code time blocks for past/present/future events
function colourCodeTextArea () {
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
    }
  });
};

//add saved events to text areas
// function populateSavedEvents () {
  //console.log(populate)
  //check if events exist in local storage

  //parse it into an array

  // for each item in the array 
    // match the id against data-time
    //populate the textaread of that data-time row with event info from that array item
//}

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  colourCodeTextArea();
  //populateSavedEvents();
};

function saveEvent (event) {
  let timeBlockID = $(event.target).siblings(".hour").attr("data-time");
  let eventInfoText = $(event.target).siblings("textarea").val();

  if (eventInfoText == " ") {
    alert("Please event information before saving")
  } else {
    let eventInfoObject = {
    timeBlockID,
    eventInfoText,
    }

    eventInfoArray.push(eventInfoObject);

    let eventInfoString = JSON.stringify(eventInfoArray);
    localStorage.setItem("eventInformation", eventInfoString);

  // destroy object text
  }

}

$("document").ready(populatePageInformation);
$(".container .row .saveBtn").click(saveEvent);