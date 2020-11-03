var url = "https://docs.google.com/spreadsheets/d/1lp036fR9FwYFdWXJWv9x6nEb3rCqecT0BhlUFjeGqnE/edit?usp=sharing";
var spreadsheet = SpreadsheetApp.openByUrl(url);
var ws = spreadsheet.getSheetByName("Final");

function doGet(e) {
  var listOfTeams = ws.getRange(2, 3, ws.getRange("C1").getDataRegion().getLastRow(), 1).getValues();
  var listOfPoints = ws.getRange(2, 2, ws.getRange("B1").getDataRegion().getLastRow(), 1).getValues();
  var ranks = ws.getRange(2, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues();
  
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = "Title";
  var counter = 0;
  var TeamListArray = listOfTeams.map(function(r){ 
      counter++;
      return '<tr><td>' + ranks[counter - 1]  + '<td>' + r[0] + '</td><td>' + listOfPoints[counter - 1] + '</td></tr>'; 
  }).join("");
  tmp.list = TeamListArray;
  return tmp.evaluate();
}

function getChartData(){
  var data = ws.getRange(2, 1, ws.getRange("A1").getDataRegion().getLastRow(), 2).getDisplayValues();
  return data;
}


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}