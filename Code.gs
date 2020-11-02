function doGet(e) {
  Logger.log(e);
  return HtmlService.createHtmlOutputFromFile("page");
}

function userClicked(name) {
  Logger.log(name + " clicked the button!");
}