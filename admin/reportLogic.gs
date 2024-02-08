// how many hours of volunteering
// how many events
// how many workshops
// how many trainings
// list of events attended

function retrieveVolunteeringHours(userEmail) {
  try {
    const ss = openSpreadSheet();
    const volunteer_tab = ss.getSheetByName(VOLUNTEER_TAB);

    var columnValues = volunteer_tab.getRange(2,2, volunteer_tab.getLastRow() - 1, volunteer_tab.getLastColumn() - 1).getValues();
    var userData = {}
    for (let customerRecord of columnValues) {
      if (customerRecord[0] == userEmail) {
        userData.fullName = customerRecord[1] + " " + customerRecord[2];
        userData.volunteeringHours = customerRecord[7];
        return userData;
      }
    }

    throw new Error("Unable to find the user with specified email.");
    } catch(error) {
      console.log(error);
    }
}

function retrieveVolunteeredId(userEmail, tabName) {
  try {
    var listOfEventId = []
    const ss = openSpreadSheet();
    const tabs = ss.getSheetByName(tabName);
    var columnValues = tabs.getRange(2,1,tabs.getLastRow(), 4).getValues();

    for(let eventRecord of columnValues) {
      if (eventRecord[1] == userEmail && eventRecord[2] == 'Yes') {
        listOfEventId.push(eventRecord[0]);
      }
    }

    return listOfEventId;
  } catch(error) {
    console.log(error);
  }

}

function retrieveNoOfVolunteeredEvents(userEmail) {
  return retrieveVolunteeredId(userEmail, VOLUNTEER_EVENT_TAB).length;
}

function retrieveEventsVolunteered(userEmail) {
  try {
    const ss = openSpreadSheet();
      var listOfEventId = retrieveVolunteeredId(userEmail, VOLUNTEER_EVENT_TAB);
      var listOfEvents = retrieveOpportunitiesDetails(EVENT_TAB_NAME, listOfEventId);
      console.log(listOfEvents);
      console.log(listOfEvents);
      return listOfEvents;

    
  } catch(error) {
    console.log(error);
  }
}

function retrieveNoOfVolunteeredWorkshop(userEmail) {
  return retrieveVolunteeredId(userEmail, VOLUNTEER_WORKSHOP_TAB).length;
}

function retrieveWorkshopsVolunteered(userEmail) {
  try {
      var listOfEventId = retrieveVolunteeredId(userEmail, VOLUNTEER_WORKSHOP_TAB);
      var listOfEvents = retrieveOpportunitiesDetails(WORKSHOP_TAB_NAME, listOfEventId);
      return listOfEvents;

    
  } catch(error) {
    console.log(error);
  }
}

function retrieveNoOfVolunteeredTraining(userEmail) {
  return retrieveVolunteeredId(userEmail, VOLUNTEER_TRAINING_TAB).length;
}

function retrieveTrainingsVolunteered(userEmail) {
  var userEmail = "irenelie1412@gmail.com";
  try {
      var listOfEventId = retrieveVolunteeredId(userEmail, VOLUNTEER_TRAINING_TAB);
      var listOfEvents = retrieveOpportunitiesDetails(TRAINING_TAB_NAME, listOfEventId);
      return listOfEvents;

    
  } catch(error) {
    console.log(error);
  }
}

function retrieveOpportunitiesDetails(tabName, oppIds) {
  try {
    const ss = openSpreadSheet();
    var listOfEvents = []
    const event_tab = ss.getSheetByName(tabName);
    columnValues = event_tab.getRange(2, 1, event_tab.getLastRow(), 5).getValues();

    for(let event of columnValues) {
      if (oppIds.indexOf(event[0]) >= 0) {
        var event_details = {}
        event_details.eventName = event[1];
        event_details.startTime = event[4].toString();

        listOfEvents.push(event_details);
      }
    }
    console.log(listOfEvents);
    return listOfEvents;
  } catch(error) {
    console.log(error);
  }
}
