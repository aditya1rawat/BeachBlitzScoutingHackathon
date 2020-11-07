var spreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1lp036fR9FwYFdWXJWv9x6nEb3rCqecT0BhlUFjeGqnE/edit?usp=sharing";
var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
var ws = spreadsheet.getSheetByName("final");
var teamList = [
  115,
  254,
  399,
  604,
  649,
  670,
  687,
  696,
  766,
  841,
  846,
  968,
  971,
  973,
  1351,
  1671,
  1678,
  1836,
  1868,
  1983,
  2073,
  2085,
  2135,
  3256,
  3309,
  3476,
  3859,
  4543,
  5012,
  5026,
  5499,
];
var Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
};

function doGet(e) {
  teamList.map(function (team) {
    return Route.path(`${team}`, teams(team));
  });
  Route.path("rank", chartPage);
  Route.path("home", homePage);
  Route.path("teams", teamsPage);
  var queryParam = e.parameter.v;
  Logger.log("----------------Route----------------");
  if (queryParam === "home") {
    Logger.log("Home: " + queryParam);
    return homePage();
  } else if (queryParam === "rank") {
    Logger.log("Rank: " + queryParam);
    return Route[queryParam]();
  } else if (queryParam === "teams") {
    Logger.log("Teams: " + queryParam);
    return Route[queryParam]();
  } else if (queryParam != null || queryParam != undefined) {
    Logger.log("Team Number: " + queryParam);
    return Route[e.parameter.v];
  } else {
    Logger.log("404 Not Found: " + queryParam);
    return homePage();
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

  var rankPage = HtmlService.createTemplateFromFile("rank");
  rankPage.title = "Title";
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
  rankPage.list = TeamListArray;
  rankPage.url = getScriptUrl();
  return rankPage.evaluate();
}

function homePage() {
  var homePage = HtmlService.createTemplateFromFile("index");
  homePage.url = getScriptUrl();
  return homePage.evaluate();
}

function teamsPage() {
  Logger.log("-------------Inside Team------------------");
  var teamsPage = HtmlService.createTemplateFromFile("team-page");
  teamsPage.url = getScriptUrl();
  return teamsPage.evaluate();

  //  return HtmlService.createHtmlOutputFromFile("team-page");
}

function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}
