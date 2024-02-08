function requestCertificate(eventId) {
  var generatedCertificate = retrieveGeneratedCertificate(eventId);
  if (generatedCertificate == "") {
    var pdfLink = createCertificate(eventId);
    storeCertificate(eventId, pdfLink);
    return pdfLink;
  } else {
    return generatedCertificate;
  }
}

function retrieveGeneratedCertificate(eventId) {
  var email = getUserEmail();

  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName( VOLUNTEER_EVENT_TAB_NAME );
  var columnValues = volunteer_tab.getRange(2, 1, volunteer_tab.getLastRow(), volunteer_tab.getLastColumn()).getValues();
  for (let record of columnValues) {
    if ((record[0] == eventId) && (record[1] == email)) {
      if (record[2] == 'Yes') {
        return record[5];
      } else {
        throw new Error("User didn't attend the event.");
      }
    }
  }
  throw new Error("User have yet to register for this event.");
}

function storeCertificate(eventId, certLink) {
   const ss = openSpreadSheet();
   const volunteer_event_tab = ss.getSheetByName( VOLUNTEER_EVENT_TAB_NAME );
   var columnValues = volunteer_event_tab.getRange(2, 1, volunteer_event_tab.getLastRow(), 2).getValues();
   rowNumber = 2;

   for (let i = 0; i < columnValues.length; i++) {
    var currRecord = columnValues[i];
    if ((currRecord[0] == eventId) && (currRecord[1] == getUserEmail())) {
      rowNumber = rowNumber + i;
      break;
    }
   }

   var cellToChange = volunteer_event_tab.getRange(rowNumber, 6);
   cellToChange.setValue(certLink);

}



function createCertificate(eventId) {
  var result =  generateHtmlContent(eventId);
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

function generateHtmlContent(eventId) {
  var event = retrieveEventDetail(eventId);
  var startDate = new Date(event.startDate);
  var endDate = new Date(event.endDate);
  
  var hoursOfService = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  var volunteeringEventName = event.title;
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
                      For ${hoursOfService} hours of service at ${volunteeringEventName}
                  </div>
              </div>
          </body>
      </html>
    `
    var fileName = fullName + " Certificate: " + volunteeringEventName;

    return [htmlContent, fileName];
}