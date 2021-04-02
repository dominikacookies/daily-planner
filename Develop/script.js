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
  if (localStorage.getItem("eventInformation") !== null) {
    savedEventInfoArray = JSON.parse(localStorage.getItem('eventInformation'));
    $.each(savedEventInfoArray, function() {
      timeBlock = this.timeBlockID;
      eventInfo = this.eventInfoText;
      timeBlockElement = $(`.hour[data-time="${timeBlock}"]`); // this is a jquery function
      timeBlockElement.siblings("textarea").val(eventInfo);
      //preprend 
  });
  } else {
    return;
  };
};

function populatePageInformation () {
  // Populate day information in the header
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  colourCodeTextArea();
  populateInfoForSavedEvents();
};

function saveEvent (event) {
  let timeBlockID = $(event.currentTarget).siblings(".hour").attr("data-time");
  let eventInfoText = $(event.currentTarget).siblings("textarea").val();

  // do we need this? what if someone wants to clear the text?
  if (eventInfoText == " ") {
    alert("Please enter event information before saving");
  } else if (localStorage.getItem("eventInformation") !== null) {
    eventInfoArray = JSON.parse(localStorage.getItem('eventInformation'));

    //identify same timeblock and destroy it

    let eventInfoObject = {
    timeBlockID,
    eventInfoText,
    }

    eventInfoArray.push(eventInfoObject);

    let eventInfoString = JSON.stringify(eventInfoArray);
    localStorage.setItem("eventInformation", eventInfoString);

  // destroy object text
  $(event.currentTarget).siblings("textarea").val(" ");
  //populate event info onto page
  setTimeout(() => {populateInfoForSavedEvents()}, 1500);
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
  //populate event info onto page
  setTimeout(() => {populateInfoForSavedEvents()}, 1500);
  }
}

$("document").ready(populatePageInformation);
$(".container").on( "click", "button", saveEvent);
//$(".container .row .saveBtn").on( "click", "button", saveEvent);
//$(".container .row .saveBtn").click(saveEvent);