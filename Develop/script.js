today = moment();
currentTime = identifyCurrentTime();
let eventInfoArray = [];
let savedEventInfoArray = [];

function identifyCurrentTime () {
  currentHour = today.format("HH");
  return currentHour;
};

//every minute trigger check what the current time is
function updateCurrentTimeTimer () {
  setInterval(identifyCurrentTime, 60000);
  colourCodeTextArea ();
};

//colour code time blocks for past/present/future events
function colourCodeTextArea () {
  $(".row").each(function() {
    let blockTime = $(this).children(".hour").attr("data-time");

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
function populateInfoForSavedEvents () {
  console.log("populate")
  if (localStorage.getItem("eventInformation") !== null) {
    savedEventInfoArray = JSON.parse(localStorage.getItem('eventInformation'));
    console.log(savedEventInfoArray)
    $.each(savedEventInfoArray, function() {
      timeBlock = this.timeBlockID;
      eventInfo = this.eventInfoText;
      //timeBlockElement = $("document").find(`[data-time='timeBlock']`);
      timeBlockElement = $('.row [data-time=' + timeBlock + ']') ;
      $(timeBlockElement).children("textarea").text(eventInfo);
 
      console.log(timeBlockElement)
  });
  } else {
    return;
  };
}

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  colourCodeTextArea();
  populateInfoForSavedEvents();
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
  $(event.target).siblings("textarea").val(" ");
  }
}

$("document").ready(populatePageInformation);
$(".container .row .saveBtn").click(saveEvent);