
// var volunteer_data = {
//   "email": "irenelie1412@gmail.com",
//   "firstName": "Irene",
//   "lastName": "Lie",
//   "age": 1,
//   "address": "Prince George Park 118430",
//   "interest": "youth",
//   "skills": "piano",
// }
function volunteerSignUp( volunteer_data ) {
  try {
    const ss = openSpreadSheet();
    const volunteer_tab = ss.getSheetByName( VOLUNTEER_TAB_NAME );

    var lastRow = volunteer_tab.getLastRow();
    var volunteerId = 0;

    // generate volunteer ID (ID always increases)
    // if there's no volunteer record inside the database
    if (lastRow === 1) {
      volunteerId = 1;
    } else {
      volunteerId = lastRow;
    }

    var volunteerInfo = [volunteerId, volunteer_data.email, volunteer_data.firstName, volunteer_data.lastName, volunteer_data.age, volunteer_data.address, volunteer_data.interest, volunteer_data.skills];
    volunteer_tab.appendRow( volunteerInfo );
    return 200;
  } catch ( error ) {
    console.error( 'An error occurred: ', error.message );
    return 500;
  }
}
