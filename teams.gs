function teams(teamNumber) {
  var teamData = spreadsheet.getSheetByName(`${teamNumber}`);
  var listOfMatches = teamData.getRange(20, 1, 11, 1).getValues();

  var listOfPoints = teamData.getRange(20, 24, 11, 1).getValues();

  var teamPage = HtmlService.createTemplateFromFile("team-template");
  teamPage.title = "Team #" + teamNumber;
  teamPage.number = teamNumber;
  var counter = 0;
  var points = listOfMatches
    .map(function (r) {
      counter++;
      return (
        "<tr><td>" +
        listOfMatches[counter - 1] +
        "</td><td>" +
        listOfPoints[counter - 1] +
        "</td></tr>"
      );
    })
    .join("");
  teamPage.matchLink = points;
  teamPage.url = getScriptUrl();
  return teamPage.evaluate();
}
