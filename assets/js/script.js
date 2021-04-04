today = moment();
currentTime = identifyCurrentTime();
let eventInfoArray = [];
let savedEventInfoArray = [];

//populate day information in the header
function populateCurrentDayInformation () {
  $("#currentDay").text(today.format("Do [of] MMM YYYY"));
  updateCurrentTimeTimer();
  colourCodeTextArea();
  populateInfoForSavedEvents();
};

// identify current time
function identifyCurrentTime () {
  currentHour = today.format("HH");
  return currentHour;
};

//every minute check what the current time is
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

//add saved event information to relevant text areas
function populateInfoForSavedEvents () {
  if (localStorage.getItem("eventInformation") !== null) {
    savedEventInfoArray = JSON.parse(localStorage.getItem('eventInformation'));
    $.each(savedEventInfoArray, function() {
      timeBlock = this.timeBlockID;
      eventInfo = this.eventInfoText;
      timeBlockElement = $(`.hour[data-time="${timeBlock}"]`);
      timeBlockElement.siblings("textarea").val(eventInfo);
    });
  } else {
    return;
  };
};

//save the event info input into local storage
function saveEvent (event) {
  let timeBlockID = $(event.currentTarget).siblings(".hour").attr("data-time");
  let eventInfoText = $(event.currentTarget).siblings("textarea").val();

  if (localStorage.getItem("eventInformation") !== null) {
    eventInfoArray = JSON.parse(localStorage.getItem('eventInformation'));

    // remove object with event info previously saved for that time block
    function removePreviouslySavedEventInfo (item) {
      if (item.timeBlockID !== timeBlockID) {
        return true
      }
      return false;
    }
    let cleansedEventInfoArray = savedEventInfoArray.filter(removePreviouslySavedEventInfo);

    let newEventInfoObject = {
    timeBlockID,
    eventInfoText,
    }

    cleansedEventInfoArray.push(newEventInfoObject);
    let newEventInfoString = JSON.stringify(cleansedEventInfoArray);
    localStorage.setItem("eventInformation", newEventInfoString);

    // destroy object text
    $(event.currentTarget).siblings("textarea").val(" ");
    //populate event info back onto page after 1.5secs
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
    //populate event info back onto page after 1.5secs
    setTimeout(() => {populateInfoForSavedEvents()}, 1500);
  }
}

$("document").ready(populateCurrentDayInformation);
$(".container").on( "click", "button", saveEvent);
