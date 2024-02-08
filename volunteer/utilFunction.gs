function openSpreadSheet() {
  return SpreadsheetApp.openById( DATABASE_SPREADSHEET_ID );
}


function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

function getUserDetails() {
  var user = {}
  var email = getUserEmail();
  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName( VOLUNTEER_TAB_NAME );
  var columnValues = volunteer_tab.getRange(1, VOLUNTEER_EMAIL_COLUMN_NUMBER, volunteer_tab.getLastRow(), volunteer_tab.getLastColumn()).getValues();

  for( let record of columnValues ) {
    if (record[0] == email) {
      user.fullName = record[1] + " " + record[2];
      user.age = record[3];
      user.address = record[4];
      user.interest = record[5];
      user.skills = record[6];
      console.log(user);
      return user;
    }
  }

  throw new Error("Unable to find specified user.");

}

function checkIfUserIsRegistered() {
  const email = getUserEmail();
  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName( VOLUNTEER_TAB_NAME );
  var columnValues = volunteer_tab.getRange(1, VOLUNTEER_EMAIL_COLUMN_NUMBER, volunteer_tab.getLastRow(), 1).getValues().flat();

  return columnValues.indexOf(email) !== -1;
  
}

function retrieveAllVolunteerInterests() {
  const ss = openSpreadSheet();
  const volunteer_interest_tab = ss.getSheetByName( VOLUNTEER_INTEREST_TAB_NAME );
  var columnValues = volunteer_interest_tab
  .getRange(2, 1, volunteer_interest_tab.getLastRow(), 1)
  .getValues()
  .flat()
  .filter(function(value) {
    return value != "";
  });;
  console.log(columnValues);
  return columnValues;
}

function retrieveEventsDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_EVENT_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const event_tab = ss.getSheetByName(EVENT_TAB_NAME);
  
  var listOfEvents = []
  for (let eventId of result) {
    eventJson = {}
    var record = event_tab.getRange(eventId + 1,1,1,5).getValues().flat();
    eventJson.id = record[0];
    eventJson.name = record[1];
    eventJson.description = record[2];
    eventJson.location = record[3];
    eventJson.time = record[4].toString();

    listOfEvents.push(eventJson);
  }
  return listOfEvents;

}


function retrieveEventsShortDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_EVENT_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const event_tab = ss.getSheetByName(EVENT_TAB_NAME);
  
  var listOfEvents = []
  for (let eventId of result) {
    eventJson = {}
    var record = event_tab.getRange(eventId + 1,1,1,2).getValues().flat();
    eventJson.id = record[0];
    eventJson.name = record[1];
    listOfEvents.push(eventJson);
  }
  return listOfEvents;

}

// WORKSHOP BLOG LOGIC

function retrieveWorkshopsDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_WORKSHOP_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const workshop_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);
  
  var listOfWorkshop = []
  for (let workshopId of result) {
    workshopJson = {}
    var record = workshop_tab.getRange(workshopId + 1,1,1,5).getValues().flat();
    workshopJson.id = record[0];
    workshopJson.name = record[1];
    workshopJson.description = record[2];
    workshopJson.location = record[3];
    workshopJson.time = record[4].toString();

    listOfWorkshop.push(workshopJson );
  }
  console.log(listOfWorkshop);
  return listOfWorkshop;


}

function retrieveWorkshopsShortDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_WORKSHOP_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const workshop_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);
  
  var listOfWorkshops = []
  for (let workshopId of result) {
    json = {}
    var record = workshop_tab.getRange(workshopId + 1,1,1,2).getValues().flat();
    json.id = record[0];
    json.name = record[1];
    listOfWorkshops.push(json);
  }
  return listOfWorkshops;

}

// TRAINING BLOG LOGIC

function retrieveTrainingsDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_TRAINING_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const training_tab = ss.getSheetByName(TRAINING_TAB_NAME);
  
  var listOfTraining = []
  for (let trainingId of result) {
    trainingJson = {}
    var record = training_tab.getRange(trainingId + 1,1,1,5).getValues().flat();
    trainingJson.id = record[0];
    trainingJson.name = record[1];
    trainingJson.description = record[2];
    trainingJson.location = record[3];
    trainingJson.time = record[4].toString();

    listOfTraining.push(trainingJson );
  }
  console.log(listOfTraining);
  return listOfTraining;
}

function retrieveTrainingsShortDetailsAttended() {
  result = retrieveATypeOfOpportunitiesAttended(VOLUNTEER_TRAINING_TAB_NAME);
  opportunity_details = {}

  const ss = openSpreadSheet();
  const training_tab = ss.getSheetByName(TRAINING_TAB_NAME);
  
  var listOfTrainings = []
  for (let trainingId of result) {
    json = {}
    var record = training_tab.getRange(trainingId + 1,1,1,2).getValues().flat();
    json.id = record[0];
    json.name = record[1];
    listOfTrainings.push(json);
  }
  return listOfTrainings;

}

// 


function retrieveAllOpportunitiesIdAttended() {
  return {
    "event": retrieveATypeOfOpportunitiesAttended(VOLUNTEER_EVENT_TAB_NAME),
    "workshop": retrieveATypeOfOpportunitiesAttended(VOLUNTEER_WORKSHOP_TAB_NAME),
    "training": retrieveATypeOfOpportunitiesAttended(VOLUNTEER_TRAINING_TAB_NAME)
  };
}

function retrieveATypeOfOpportunitiesAttended(opportunityType) {
  if (checkIfUserIsRegistered()) {
    var userEmail = getUserEmail();
    var listOfEventIds = [];
    const ss = openSpreadSheet();
    const volunteerEventsTab = ss.getSheetByName(opportunityType);
    var listOfRecords = volunteerEventsTab.getRange(2,1,volunteerEventsTab.getLastRow(), 3).getValues();
    for (let record of listOfRecords) {
      if (record[1] === userEmail && record[2] === 'Yes') {
        listOfEventIds.push(record[0]);
      }
    }
    return listOfEventIds;

  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
}

