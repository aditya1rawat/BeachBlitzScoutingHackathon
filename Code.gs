var url =
  "https://docs.google.com/spreadsheets/d/1lp036fR9FwYFdWXJWv9x6nEb3rCqecT0BhlUFjeGqnE/edit?usp=sharing";
var spreadsheet = SpreadsheetApp.openByUrl(url);
var ws = spreadsheet.getSheetByName("final");
var Route = {};
Route.path = function(route, callback){
  Route[route] = callback;
}

function doGet(e) {
//  return chartPage();
  Route.path("rank", chartPage);
  Route.path("home", homePage);
  
  if(Route[e.parameters.v]){
    return Route[e.parameters.v]();
  }else{
    return HtmlService.createTemplateFromFile('index').evaluate();

  }
}

function chartPage() {
  var ws = spreadsheet.getSheetByName("final");
  var listOfTeams = ws
    .getRange(2, 3, ws.getRange("C1").getDataRegion().getLastRow(), 1)
    .getValues();
  var listOfPoints = ws
    .getRange(2, 2, ws.getRange("B1").getDataRegion().getLastRow(), 1)
    .getValues();
  var ranks = ws
    .getRange(2, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1)
    .getValues();

  var tmp = HtmlService.createTemplateFromFile("rank");
  tmp.title = "Title";
  var counter = 0;
  var TeamListArray = listOfTeams
    .map(function (r) {
      counter++;
      return (
        "<tr><td>" +
        ranks[counter - 1] +
        "<td>" +
        r[0] +
        "</td><td>" +
        listOfPoints[counter - 1] +
        "</td></tr>"
      );
    })
    .join("");
  tmp.list = TeamListArray;
  return tmp.evaluate();
}

function homePage(){
    return HtmlService.createHtmlOutput('index').evaluate();
}