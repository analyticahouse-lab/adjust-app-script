

function main() {
  var url = 'https://dash.adjust.com/control-center/reports-service/csv_report?cost_mode=network'
  var bearerToken = ''; //  --> Auth API Token
  var appTokenIn = '';   //  --> App Token
  var datePeriod = '2023-06-01:2023-06-30';
  var metrics = 'installs';
  var dimensions = 'day,os_name,store_id,partner,platform'; //  See dimension list here: --> https://help.adjust.com/en/article/csv-reports-endpoint
  var targetSheetId = '';  //  --> Google Sheet ID
  var targetSheetName = ''; //  --> Google Sheet Name

  fetchDataAndWriteToSheet(url, bearerToken, appTokenIn, datePeriod, dimensions, metrics, targetSheetId, targetSheetName);
}

function fetchDataAndWriteToSheet(url, bearerToken, appTokenIn, datePeriod, dimensions, metrics, targetSheetId, targetSheetName) {

  var fullUrl = url +
    '&app_token__in=' + appTokenIn +
    '&date_period=' + datePeriod +
    '&dimensions=' + dimensions +
    '&metrics=' + metrics;
  var options = {
    headers: {
      'Authorization': 'Bearer ' + bearerToken
    }
  };

  var response = UrlFetchApp.fetch(fullUrl, options);
  var content = response.getContentText();

  var csvData = Utilities.parseCsv(content);

  var targetSpreadsheet = SpreadsheetApp.openById(targetSheetId);
  var targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
  if (targetSheet == null) {
    targetSheet = targetSpreadsheet.insertSheet(targetSheetName);
  } else {
    targetSheet.clearContents();
  }

  targetSheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
