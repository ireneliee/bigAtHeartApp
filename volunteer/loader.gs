// the first landing page
function doGet(e) {
  if (checkIfUserIsRegistered()) {
    return HtmlService.createHtmlOutputFromFile('landingPage');
  } else {
    return HtmlService.createHtmlOutputFromFile('signupPage');
  }
    
}

function loadPartialHTML_(partial) {
  const htmlForWebApp = HtmlService.createTemplateFromFile(partial);
  return htmlForWebApp.evaluate().getContent();
}

function loadLandingPage() {
  return loadPartialHTML_("landingPage");
}

function loadEventLandingPage() {
  return loadPartialHTML_("eventLandingPage");
}

function loadWorkshopLandingPage() {
  return loadPartialHTML_("workshopLandingPage");
}

function loadTrainingLandingPage() {
  return loadPartialHTML_("trainingLandingPage");
}

function loadAttendedEventPage() {
  return loadPartialHTML_("attendedEventPage");
}

function loadAttendedWorkshopPage() {
  return loadPartialHTML_("attendedWorkshopPage");
}

function loadAttendedTrainingPage() {
  return loadPartialHTML_("attendedTrainingPage");
}

function loadBlogpostPage() {
  return loadPartialHTML_("blogpostPage");
}

function loadCreateEventPost() {
  return loadPartialHTML_("createEventPost");
}

function loadCreateWorkshopPost() {
  return loadPartialHTML_("createWorkshopPost");
}

function loadCreateTrainingPost() {
  return loadPartialHTML_("createTrainingPost");
}