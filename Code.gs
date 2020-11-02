function doGet(e) {
  Logger.log(e);
  return HtmlService.createTemplateFromFile("page").evaluate();
}

function userClicked(userInfo) {
  var url = "https://docs.google.com/spreadsheets/d/1zTIOTnwzNVyFRhoOhdscrEcX7EQyNVAZzIMOINR5wEk/edit?usp=sharing";
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Data");
  
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, new Date()]);
  
//  Logger.log(name + " clicked the button!");
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}