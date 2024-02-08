function doGet() {
  return HtmlService.createHtmlOutputFromFile('homePage');
}

function loadPartialHTML_(partial) {
  const htmlForWebApp = HtmlService.createTemplateFromFile(partial);
  return htmlForWebApp.evaluate().getContent();
}

function loadHomePage() {
  return loadPartialHTML_("homePage");
}

function loadCreateEventPage() {
  return loadPartialHTML_("createEventPage");
}

function loadCreateWorkshopPage() {
  return loadPartialHTML_("createWorkshopPage");
}

function loadCreateTrainingPage() {
  return loadPartialHTML_("createTrainingPage");
}

function loadReportPage() {
  return loadPartialHTML_("reportPage");
}

function loadAggregateReportPage() {
  return loadPartialHTML_("aggregateReport");
}