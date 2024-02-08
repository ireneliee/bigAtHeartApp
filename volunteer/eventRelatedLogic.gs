function retrieveAllEvents() {
  event_list = []
  const ss = openSpreadSheet();
  const events_tab = ss.getSheetByName(EVENT_TAB_NAME);
  var columnValues = events_tab.getRange(2, 1, events_tab .getLastRow(), 7).getValues();
  columnValues.forEach(function(event_value) {
      if (event_value[0] != "") {
        event = {};
        event.id = event_value[0];
        event.name = event_value[1];
        event.description = event_value[2];
        event.location = event_value[3];
        event.start = event_value[4].toString();
        event.end = event_value[5].toString();
        event.tags = event_value[6].split(",");
        event_list.push(event);
      }
  });
  console.log(event_list);
  return event_list;
}

function reserveEvent(eventId) {
  if (checkIfUserIsRegistered()) {
    const userEmail = getUserEmail();
    const ss = openSpreadSheet();
    const attendance_tab = ss.getSheetByName(VOLUNTEER_EVENT_TAB_NAME);
    if (!checkIfUserHasReserved(eventId)) {
      var eventReservationInfo = [eventId, userEmail, "No"]
      attendance_tab.appendRow(eventReservationInfo);
      increaseCurrNumberOfVolunteer(eventId)
    } else {
      throw new Error("User has reserved this event.");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
}

function increaseCurrNumberOfVolunteer(eventId) {
  const ss = openSpreadSheet();
  const events_tab = ss.getSheetByName(EVENT_TAB_NAME);
  var currVolunteerCell = events_tab.getRange(eventId + 1, 10, 1, 1);
  console.log('Curr volunter cell is ' + currVolunteerCell.getValue());
  var maxVolunteerCell = events_tab.getRange(eventId + 1, 9, 1, 1);
  if (currVolunteerCell.getValue() >= maxVolunteerCell.getValue()) {
    throw new Error("Maximum number of volunteer has been reached.");
  }
  currVolunteerCell.setValue(currVolunteerCell.getValue() + 1);
}


function checkIfUserHasReserved(eventId) {
  const userEmail = getUserEmail();
  const ss = openSpreadSheet();
  const events_tab = ss.getSheetByName(EVENT_TAB_NAME);
  var listOfValidIndex = events_tab.getRange(2,1, events_tab.getLastRow(), 1).getValues().flat();
  if (listOfValidIndex.indexOf(eventId) != -1) {
    const attendance_tab = ss.getSheetByName(VOLUNTEER_EVENT_TAB_NAME);
    var listOfEventId = attendance_tab.getRange(2, 1, attendance_tab.getLastRow(), 1).getValues().flat();
    var listOfEmailId = attendance_tab.getRange(2, 2, attendance_tab.getLastRow(), 1).getValues().flat();
    for (let account of listOfEmailId) {
      if (account === userEmail) {
        for (let event of listOfEventId) {
          if (event === eventId) {
            return true;
          }
        }
      }

      return false;
    }
  } else {
    throw new Error ("Invalid event ID");
  }
}

function checkIfUserHasReservedWorkshop(id) {
  const userEmail = getUserEmail();
  const ss = openSpreadSheet();
  const workshops_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);
  var listOfValidIndex = workshops_tab.getRange(2,1, workshops_tab.getLastRow(), 1).getValues().flat();
  if (listOfValidIndex.indexOf(id) != -1) {
    const attendance_tab = ss.getSheetByName(VOLUNTEER_WORKSHOP_TAB_NAME);
    var listOfWorkshopId = attendance_tab.getRange(2, 1, attendance_tab.getLastRow(), 1).getValues().flat();
    var listOfEmailId = attendance_tab.getRange(2, 2, attendance_tab.getLastRow(), 1).getValues().flat();
    for (let account of listOfEmailId) {
      if (account === userEmail) {
        for (let workshop of listOfWorkshopId) {
          if (workshop === workshopId) {
            return true;
          }
        }
      }

      return false;
    }
  } else {
    throw new Error ("Invalid workshop ID");
  }
}

function checkIfUserHasReservedTraining(id) {
  const userEmail = getUserEmail();
  const ss = openSpreadSheet();
  const trainings_tab = ss.getSheetByName(TRAINING_TAB_NAME);
  var listOfValidIndex = trainings_tab.getRange(2,1, trainings_tab.getLastRow(), 1).getValues().flat();
  if (listOfValidIndex.indexOf(id) != -1) {
    const attendance_tab = ss.getSheetByName(VOLUNTEER_TRAINING_TAB_NAME);
    var listOfTrainingId = attendance_tab.getRange(2, 1, attendance_tab.getLastRow(), 1).getValues().flat();
    var listOfEmailId = attendance_tab.getRange(2, 2, attendance_tab.getLastRow(), 1).getValues().flat();
    for (let account of listOfEmailId) {
      if (account === userEmail) {
        for (let training of listOfTrainingId) {
          if (training === trainingId) {
            return true;
          }
        }
      }

      return false;
    }
  } else {
    throw new Error ("Invalid training ID");
  }
}



function retrieveEventDetail(eventId) {
  if (checkIfUserIsRegistered()) {
    const ss = openSpreadSheet();
    const events_tab = ss.getSheetByName(EVENT_TAB_NAME);
    var listOfValidIndex = events_tab.getRange(2,1, events_tab.getLastRow(), 1).getValues().flat();
    if (listOfValidIndex.indexOf(eventId) != -1) {
      var eventValues = events_tab.getRange(eventId + 1, 1, 1, events_tab.getLastColumn()).getValues().flat();
      event = {}
      event.id = eventValues[0];
      event.title = eventValues[1];
      event.description = eventValues[2];
      event.location = eventValues[3];
      event.startDate = eventValues[4].toString();
      event.endDate = eventValues[5].toString();
      event.tags = eventValues[6].split(",");
      event.minVolunteer = eventValues[7];
      event.maxVolunteer = eventValues[8];
      event.currVolunteer = eventValues[9];
      
      return event;
    } else {
      throw new Error ("Invalid event ID");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
  
}

//retrieve workshop details

function retrieveWorkshopDetail(workshopId) {
  if (checkIfUserIsRegistered()) {
    const ss = openSpreadSheet();
    const workshops_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);
    var listOfValidIndex = workshops_tab.getRange(2,1, workshops_tab.getLastRow(), 1).getValues().flat();
    if (listOfValidIndex.indexOf(workshopId) != -1) {
      var workshopValues = workshops_tab.getRange(workshopId + 1, 1, 1, workshops_tab.getLastColumn()).getValues().flat();
      workshop = {}
      workshop.id = workshopValues[0];
      workshop.title = workshopValues[1];
      workshop.description = workshopValues[2];
      workshop.location = workshopValues[3];
      workshop.date = workshopValues[4].toString();
      workshop.start = workshopValues[5].toString();
      workshop.end = workshopValues[6].toString();
      workshop.tags = workshopValues[7].split(",");
      workshop.capacity = workshopValues[8];
      
      return workshop;
    } else {
      throw new Error ("Invalid workshop ID");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
  
}

//retrieve training details

function retrieveTrainingDetail(trainingId) {
  if (checkIfUserIsRegistered()) {
    const ss = openSpreadSheet();
    const trainings_tab = ss.getSheetByName(TRAINING_TAB_NAME);
    var listOfValidIndex = trainings_tab.getRange(2,1, trainings_tab.getLastRow(), 1).getValues().flat();
    if (listOfValidIndex.indexOf(trainingId) != -1) {
      var trainingValues = trainings_tab.getRange(trainingId + 1, 1, 1, trainings_tab.getLastColumn()).getValues().flat();
      training = {}
      training.id = trainingValues[0];
      training.title = trainingValues[1];
      training.description = trainingValues[2];
      training.location = trainingValues[3];
      training.date = trainingValues[4].toString();
      training.start = trainingValues[5].toString();
      training.end = trainingValues[6].toString();
      training.tags = trainingValues[7].split(",");
      training.capacity = trainingValues[8];
      
      return training;
    } else {
      throw new Error ("Invalid training ID");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
  
}
																
function retrieveAllWorkshops() {
  workshop_list = []
  const ss = openSpreadSheet();
  const workshops_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);
  var columnValues = workshops_tab.getRange(2, 1, workshops_tab .getLastRow(), 9).getValues();
  columnValues.forEach(function(workshop_value) {
      if (workshop_value[0] != "") {
        workshop = {};
        workshop.id = workshop_value[0];
        workshop.name = workshop_value[1];
        workshop.description = workshop_value[2];
        workshop.location = workshop_value[3];
        workshop.date = workshop_value[4].toString();
        workshop.start = workshop_value[5].toString();
        workshop.end = workshop_value[6].toString();
        workshop.tags = workshop_value[7].split(",");
        workshop.capacity = workshop_value[8].toString();
        workshop_list.push(workshop);
      }
  });
  console.log(workshop_list);
  return workshop_list;
}

function reserveWorkshop(workshopId) {
  if (checkIfUserIsRegistered()) {
    const userEmail = getUserEmail();
    const ss = openSpreadSheet();
    const attendance_tab = ss.getSheetByName(VOLUNTEER_WORKSHOP_TAB_NAME);
    if (!checkIfUserHasReservedWorkshop(workshopId)) {
      var workshopReservationInfo = [workshopId, userEmail, "No"]
      attendance_tab.appendRow(workshopReservationInfo);
      increaseCurrNumberOfVolunteer(workshopId)
    } else {
      throw new Error("User has reserved this workshop.");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
}

// retrieve trainings

function retrieveAllTrainings() {
  training_list = []
  const ss = openSpreadSheet();
  const trainings_tab = ss.getSheetByName(TRAINING_TAB_NAME);
  var columnValues = trainings_tab.getRange(2, 1, trainings_tab .getLastRow(), 9).getValues();
  columnValues.forEach(function(training_value) {
      if (training_value[0] != "") {
        training = {};
        training.id = training_value[0];
        training.name = training_value[1];
        training.description = training_value[2];
        training.location = training_value[3];
        training.date = training_value[4].toString();
        training.start = training_value[5].toString();
        training.end = training_value[6].toString();
        training.tags = training_value[7].split(",");
        training.capacity = training_value[8].toString();
        training_list.push(training);
      }
  });
  console.log(training_list);
  return training_list;
}

function reserveTraining(trainingId) {
  if (checkIfUserIsRegistered()) {
    const userEmail = getUserEmail();
    const ss = openSpreadSheet();
    const attendance_tab = ss.getSheetByName(VOLUNTEER_TRAINING_TAB_NAME);
    if (!checkIfUserHasReservedTraining(trainingId)) {
      var trainingReservationInfo = [trainingId, userEmail, "No"]
      attendance_tab.appendRow(trainingReservationInfo);
      increaseCurrNumberOfVolunteer(trainingId)
    } else {
      throw new Error("User has reserved this training.");
    }
  } else {
    throw new Error("User has been logged out. Please refresh the web application.");
  }
}