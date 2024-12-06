// Serve the HTML form
function doGet() {
    return HtmlService.createHtmlOutputFromFile('form')
                      .setTitle('Church Event Check-In');
  }
  
  // Handle form submissions
  function doPost(e) {
    try {
      const data = JSON.parse(e.postData.contents);
      const name = data.name;
      const phone = data.phone;
  
      // Log the submitted data
      Logger.log("Name: " + name + ", Phone: " + phone);
  
      // Append the data to Google Sheets
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.appendRow([name, phone, new Date()]);
  
      // Return a success response
      return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
                           .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      Logger.log("Error: " + err);
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
                           .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  