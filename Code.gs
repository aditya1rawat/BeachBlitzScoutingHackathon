var url = "https://docs.google.com/spreadsheets/d/1zTIOTnwzNVyFRhoOhdscrEcX7EQyNVAZzIMOINR5wEk/edit?usp=sharing";

function doGet(e) {
  
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Data");
  
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = "Title";
  tmp.list = ["Google Sheets","Microsoft Excel"]
  return tmp.evaluate();
}

function userClicked(userInfo) {
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Data");
  
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, new Date()]);
  
//  Logger.log(name + " clicked the button!");
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}