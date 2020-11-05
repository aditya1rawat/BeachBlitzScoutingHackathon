function getChartData() {
  var data = ws
    .getRange(1, 1, ws.getRange("A1").getDataRegion().getLastRow() - 1, 2)
    .getValues();
  Logger.log(data);
  return data;
}