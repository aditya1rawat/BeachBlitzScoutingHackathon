function doGet(e) {
  Logger.log(e);
  return HtmlService.createHtmlOutputFromFile("page");
}

function userClicked(name) {
  var url = "https://docs.google.com/spreadsheets/d/1zTIOTnwzNVyFRhoOhdscrEcX7EQyNVAZzIMOINR5wEk/edit#gid=0";
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Data");
  Logger.log(name + " clicked the button!");
}