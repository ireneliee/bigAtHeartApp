function requestTrainingCertificate(trainingId) {
  var generatedCertificate = retrieveGeneratedTrainingCertificate(trainingId);
  if (generatedCertificate == "") {
    var pdfLink = createTrainingCertificate(trainingId);
    storeCertificate(trainingId, pdfLink);
    return pdfLink;
  } else {
    return generatedCertificate;
  }
}

function retrieveGeneratedTrainingCertificate(trainingId) {
  var email = getUserEmail();

  const ss = openSpreadSheet();
  const volunteer_tab = ss.getSheetByName( VOLUNTEER_TRAINING_TAB_NAME );
  var columnValues = volunteer_tab.getRange(2, 1, volunteer_tab.getLastRow(), volunteer_tab.getLastColumn()).getValues();
  for (let record of columnValues) {
    if ((record[0] == trainingId) && (record[1] == email)) {
      if (record[2] == 'Yes') {
        return record[5];
      } else {
        throw new Error("User didn't attend the training.");
      }
    }
  }
  throw new Error("User have yet to register for this training.");
}

function storeTrainingCertificate(trainingId, certLink) {
   const ss = openSpreadSheet();
   const volunteer_training_tab = ss.getSheetByName( VOLUNTEER_TRAINING_TAB_NAME );
   var columnValues = volunteer_training_tab.getRange(2, 1, volunteer_training_tab.getLastRow(), 2).getValues();
   rowNumber = 2;

   for (let i = 0; i < columnValues.length; i++) {
    var currRecord = columnValues[i];
    if ((currRecord[0] == trainingId) && (currRecord[1] == getUserEmail())) {
      rowNumber = rowNumber + i;
      break;
    }
   }

   var cellToChange = volunteer_training_tab.getRange(rowNumber, 6);
   cellToChange.setValue(certLink);

}



function createTrainingCertificate(trainingId) {
  var result =  generateTrainingHtmlContent(trainingId);
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

function generateTrainingHtmlContent(trainingId) {
  var training = retrieveTrainingDetail(trainingId);
  // var startDate = new Date(training.startDate);
  // var endDate = new Date(training.endDate);
  
  // Given inputs 
  var dateStr = training.date;
  var startTimeStr = training.start;
  var endTimeStr = training.end;

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

  console.log(startDate)

  var hoursOfService = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  var volunteeringTrainingName = training.title;
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
                      For ${hoursOfService} hours of service at ${volunteeringTrainingName}
                  </div>
              </div>
          </body>
      </html>
    `
    var fileName = fullName + " Certificate: " + volunteeringTrainingName;

    return [htmlContent, fileName];
}
