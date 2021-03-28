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
  let blockID = $(event.target).siblings(".hour").attr("data-time");
  let eventInfo = $(event.target).siblings("textarea").val();
  // let timeID = event.target;
  console.log(blockID);
  console.log(eventInfo);


  //let eventInfo = //text in sibling object

  //let eventInformationObject {}

  //stringify object and store in local storage

  // destroy object text

}

$("document").ready(populatePageInformation);
$(".container .row .saveBtn").click(saveEvent);