function openSpreadSheet() {
  return SpreadsheetApp.openById( DATABASE_SPREADSHEET_ID );
}

// var event_data = {
//   "eventId": "1",
//   "eventName": "Irene's Bday",
//   "eventDescription": "She's one year older!",
//   "eventLocation": UTown,
//   "eventStart": "16/03/2024 13:20:00",
//   "eventEnd": "16/03/2024 18:20:00",
//   "eventTag": "Youth",
//   "minVolunteerHours": "1",
//   "maxVolunteerHours": "5",
//   "currNumberOfVolunteer": "1"
// }

function createNewEvent(event_data) {
  Logger.log("createNewEvent called ***");
  try {
    const ss = openSpreadSheet();
    const event_tab = ss.getSheetByName(EVENT_TAB_NAME);

    var lastRow = event_tab.getLastRow();
    var eventId = 0;

    // generate next available ID
    if (lastRow === 1) {
      eventId = 1;
    } else {
      eventId = lastRow;
    }

    Logger.log(event_data);

    // parse event tags to required formatting
    var eventTags = event_data.eventTag;
    var formattedTags = eventTags.join("\n");

    Logger.log(formattedTags);

    var eventInfo = [eventId, event_data.eventName, event_data.eventDescription, event_data.eventLocation, event_data.eventStart, event_data.eventEnd, formattedTags, event_data.minVolunteerHours, event_data.maxVolunteerHours, 0];

    Logger.log(eventInfo);

    event_tab.appendRow(eventInfo);

    Logger.log('Event is created successfully!');

    // Returning a success message instead of a number
    return 'Event is created successfully!';
  } catch (error) {
    console.error('An error occurred: ', error.message);
    // Returning an error message instead of a number
    return 'An error occurred: ' + error.message;
  }
}

// create new workshop 

function createNewWorkshop(workshop_data) {
  Logger.log("createNewWorkshop called ***");
  try {
    const ss = openSpreadSheet();
    const workshop_tab = ss.getSheetByName(WORKSHOP_TAB_NAME);

    var lastRow = workshop_tab.getLastRow();
    var workshopId = 0;

    // generate next available ID
    if (lastRow === 1) {
      workshopId = 1;
    } else {
      workshopId = lastRow;
    }

    Logger.log(workshop_data);

    // parse workshop tags to required formatting
    var workshopTags = workshop_data.workshopTag;
    var formattedTags = workshopTags.join("\n");

    Logger.log(formattedTags);

    var workshopInfo = [workshopId, workshop_data.workshopName, workshop_data.workshopDescription, workshop_data.workshopLocation, workshop_data.workshopDate, workshop_data.workshopStart, workshop_data.workshopEnd, formattedTags, workshop_data.workshopCapacity];

    Logger.log(workshopInfo);

    workshop_tab.appendRow(workshopInfo);

    Logger.log('Workshop is created successfully!');

    // Returning a success message instead of a number
    return 'Workshop is created successfully!';
  } catch (error) {
    console.error('An error occurred: ', error.message);
    // Returning an error message instead of a number
    return 'An error occurred: ' + error.message;
  }
}

// create new training 

function createNewTraining(training_data) {
  Logger.log("createNewTraining called ***");
  try {
    const ss = openSpreadSheet();
    const training_tab = ss.getSheetByName(TRAINING_TAB_NAME);

    var lastRow = training_tab.getLastRow();
    var trainingId = 0;

    // generate next available ID
    if (lastRow === 1) {
      trainingId = 1;
    } else {
      trainingId = lastRow;
    }

    Logger.log(training_data);

    // parse training tags to required formatting
    var trainingTags = training_data.trainingTag;
    var formattedTags = trainingTags.join("\n");

    Logger.log(formattedTags);

    var trainingInfo = [trainingId, training_data.trainingName, training_data.trainingDescription, training_data.trainingLocation, training_data.trainingDate,training_data.trainingStart, training_data.trainingEnd, formattedTags, training_data.trainingCapacity];

    Logger.log(trainingInfo);

    training_tab.appendRow(trainingInfo);

    Logger.log('Training is created successfully!');

    // Returning a success message instead of a number
    return 'Training is created successfully!';
  } catch (error) {
    console.error('An error occurred: ', error.message);
    // Returning an error message instead of a number
    return 'An error occurred: ' + error.message;
  }
}

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

// retrieve all workshopss

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

// retrieve all trainings
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

function markAttendance(eventId, email) {
  eventId = parseInt(eventId);

  const ss = openSpreadSheet();
  const volunteer_events_tab = ss.getSheetByName(VOLUNTEER_EVENT_TAB); 
  const values = volunteer_events_tab.getRange(2, 1, volunteer_events_tab.getLastRow(), 7).getValues(); 

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    if (row[0] == eventId && row[1] == email) {
      volunteer_events_tab.getRange(i+2, 3).setValue('Yes'); //
      console.log(`Attendance marked for ${email} in event ${eventId}`);
      break; 
    }
  }


  const event_tab = ss.getSheetByName(EVENT_TAB_NAME);
  const event_details = event_tab.getRange(eventId + 1, 5, 1, 2).getValues().flat();


  
  var noOfHours = hoursInBetween(event_details[0], event_details[1]);


  const volunteer_tab = ss.getSheetByName(VOLUNTEER_TAB);
  const volunteer_details = volunteer_tab.getRange(2, 1, volunteer_tab.getLastRow(), 9).getValues();

  for (let i = 0; i < volunteer_details.length; i++) {
    const row = volunteer_details[i];
    if (row[1] == email) {
      var old_value = volunteer_tab.getRange(i + 2, 9).getValue();
      var totalHours = noOfHours + old_value;
      volunteer_tab.getRange(i + 2, 9).setValue(old_value + noOfHours);
    }
  }
}

function hoursInBetween(dateString1, dateString2) {
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);

  var differenceInMilliseconds = date2 - date1;

  var differenceInHours = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60));

  return differenceInHours
}

function getVolunteersForEvent(eventId) {
  console.log(eventId);
  let volunteers = []; 
  const ss = openSpreadSheet();
  const volunteer_events_tab = ss.getSheetByName(VOLUNTEER_EVENT_TAB); 
  const columnValues = volunteer_events_tab.getRange(2, 1, volunteer_events_tab.getLastRow(), 7).getValues(); 

  columnValues.forEach(function(row) {
    if (row[0] == eventId) { 
      let volunteer = {
        eventId: row[0],
        email: row[1],
        attended: row[2],
        // timeIn: row[3].toString(),
        // timeOut: row[4].toString(),
        // certificate: row[5],
        // blogpost: row[6]
      };
      volunteers.push(volunteer);
    }
  });
  console.log(volunteers);
  return volunteers;
}

function getAllVolunteers() {
  console.log("getAllVolunteers called ***");
  let volunteers = []; 
  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName(VOLUNTEER_TAB); 
  const columnValues = volunteer_tab.getRange(2, 1, volunteer_tab.getLastRow(), 7).getValues(); 

  columnValues.forEach(function(row) {
    console.log(row)
    if (row[0].length != "") {
      let volunteer = {
        volunteerId: row[0],
        email: row[1],
        firstName: row[2],
        lastName: row[3],
        age: row[4].toString(),
        address: row[5],
        skills: row[6].split(",")
      };
      volunteers.push(volunteer);
    }
  });
  console.log(volunteers);
  return volunteers;
}
