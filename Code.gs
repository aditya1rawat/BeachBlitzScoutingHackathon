var url = "https://docs.google.com/spreadsheets/d/1lp036fR9FwYFdWXJWv9x6nEb3rCqecT0BhlUFjeGqnE/edit?usp=sharing";

function doGet(e) {
  
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var ws = spreadsheet.getSheetByName("Final");
  var listOfTeams = ws.getRange(2, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues();
  var listOfPoints = ws.getRange(2, 2, ws.getRange("B1").getDataRegion().getLastRow(), 1).getValues();
  
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = "Title";
  var counter = 0;
  var TeamListArray = listOfTeams.map(function(r){ 
    return '<tr><td>' + r[0] + '</td><td>' + listOfPoints[counter++] + '</td></tr>'; 
  }).join("");
  tmp.list = TeamListArray;
  return tmp.evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}