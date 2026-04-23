// ============================================================
// LOG7 CAPITAL — INVESTOR SHEET APPS SCRIPT
// Paste this into your Investor Google Sheet:
// Extensions → Apps Script → paste → Save → Deploy
// ============================================================

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var rows = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // Skip empty rows
      if (!row[0]) continue;
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j] !== undefined ? row[j].toString() : "";
      }
      rows.push(obj);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: rows }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
