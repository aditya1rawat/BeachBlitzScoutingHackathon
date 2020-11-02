var url = "https://docs.google.com/spreadsheets/d/1zTIOTnwzNVyFRhoOhdscrEcX7EQyNVAZzIMOINR5wEk/edit?usp=sharing";

function doGet(e) {
  
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Options");
  var list = ws.getRange(1, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues();
  
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = "Title";
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>'; }).join("");
  tmp.list = htmlListArray;
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