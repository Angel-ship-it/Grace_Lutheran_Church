// Google Apps Script to handle form submissions for church event check-in

/**
 * Serves the HTML form for the web app.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('form')
    .setTitle('Church Event Check-In');
}

/**
 * Handles form submissions, validates phone number, and appends data to Google Sheets.
 * @param {Object} e - The event parameter containing form data.
 * @returns {ContentService.TextOutput} JSON response indicating success or error.
 */
function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const name = data.name;
    const phone = data.phone;

    // Validate the phone number (must be exactly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      throw new Error('Invalid phone number. It must be exactly 10 digits.');
    }

    // Append data to Google Sheets
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([name, phone, new Date()]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error and return an error response
    Logger.log('Error: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
