function requestWorkshopCertificate(workshopId) {
  var generatedCertificate = retrieveGeneratedWorkshopCertificate(workshopId);
  if (generatedCertificate == "") {
    var pdfLink = createWorkshopCertificate(workshopId);
    storeCertificate(workshopId, pdfLink);
    return pdfLink;
  } else {
    return generatedCertificate;
  }
}

function retrieveGeneratedWorkshopCertificate(workshopId) {
  var email = getUserEmail();

  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName( VOLUNTEER_WORKSHOP_TAB_NAME );
  var columnValues = volunteer_tab.getRange(2, 1, volunteer_tab.getLastRow(), volunteer_tab.getLastColumn()).getValues();
  for (let record of columnValues) {
    if ((record[0] == workshopId) && (record[1] == email)) {
      if (record[2] == 'Yes') {
        return record[5];
      } else {
        throw new Error("User didn't attend the workshop.");
      }
    }
  }
  throw new Error("User have yet to register for this workshop.");
}

function storeWorkshopCertificate(workshopId, certLink) {
   const ss = openSpreadSheet();
   const volunteer_workshop_tab = ss.getSheetByName( VOLUNTEER_WORKSHOP_TAB_NAME );
   var columnValues = volunteer_workshop_tab.getRange(2, 1, volunteer_workshop_tab.getLastRow(), 2).getValues();
   rowNumber = 2;

   for (let i = 0; i < columnValues.length; i++) {
    var currRecord = columnValues[i];
    if ((currRecord[0] == workshopId) && (currRecord[1] == getUserEmail())) {
      rowNumber = rowNumber + i;
      break;
    }
   }

   var cellToChange = volunteer_workshop_tab.getRange(rowNumber, 6);
   cellToChange.setValue(certLink);

}



function createWorkshopCertificate(workshopId) {
  var result =  generateWorkshopHtmlContent(workshopId);
  var htmlContent = result[0];
  var fileName = result[1];

  // Convert HTML to PDF using html2pdf library
  var blob = HtmlService.createHtmlOutput(htmlContent).getAs('application/pdf').setName(fileName);
  
  // Save the PDF to Drive
  var folder = DriveApp.getRootFolder(); // Change this to the desired folder
  var file = folder.createFile(blob);
  
  // Get the URL of the saved PDF file
  var pdfUrl = file.getUrl();
  // Return the URL of the PDF file
  return pdfUrl;

}

function generateWorkshopHtmlContent(workshopId) {
  var workshop = retrieveWorkshopDetail(workshopId);
  // var startDate = new Date(workshop.start);
  // var endDate = new Date(workshop.end);

  // Given inputs
  var dateStr = workshop.date;
  var startTimeStr = workshop.start;
  var endTimeStr = workshop.end;

  // Split date string into month, day, and year
  var [month, day, year] = dateStr.split("/");

  // Split start time string into hours and minutes
  var [startHour, startMinute] = startTimeStr.split(":");

  // Split end time string into hours and minutes
  var [endHour, endMinute] = endTimeStr.split(":");

  // Create start date object
  var startDate = new Date(year, month - 1, day, startHour, startMinute);

  // Create end date object
  var endDate = new Date(year, month - 1, day, endHour, endMinute);
  
  var hoursOfService = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  var volunteeringWorkshopName = workshop.title;
  var fullName = getUserDetails().fullName;

  var htmlContent = `
      <html>
          <head>
              <style type='text/css'>
                  body, html {
                      margin: 0;
                      padding: 0;
                  }
                  body {
                      color: black;
                      display: table;
                      font-family: Georgia, serif;
                      font-size: 24px;
                      text-align: center;
                  }
                  .container {
                      border: 20px solid tan;
                      width: 750px;
                      height: 563px;
                      display: table-cell;
                      vertical-align: middle;
                  }
                  .logo {
                      color: tan;
                  }

                  .marquee {
                      color: tan;
                      font-size: 48px;
                      margin: 20px;
                  }
                  .assignment {
                      margin: 20px;
                  }
                  .person {
                      border-bottom: 2px solid black;
                      font-size: 32px;
                      font-style: italic;
                      margin: 20px auto;
                      width: 400px;
                  }
                  .reason {
                      margin: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="logo">
                      Big at Heart
                  </div>

                  <div class="marquee">
                      Certificate of Completion
                  </div>

                  <div class="assignment">
                      This certificate is presented to
                  </div>

                  <div class="person">
                      ${fullName}
                  </div>

                  <div class="reason">
                      For ${hoursOfService} hours of service at ${volunteeringWorkshopName}
                  </div>
              </div>
          </body>
      </html>
    `
    var fileName = fullName + " Certificate: " + volunteeringWorkshopName;

    return [htmlContent, fileName];
}
