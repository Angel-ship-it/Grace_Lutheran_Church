function doPost(e) {
    try {
      // Log incoming data for debugging
      Logger.log("Request Received: " + JSON.stringify(e));
      
      // Parse the JSON payload
      const data = JSON.parse(e.postData.contents);
      const name = data.name;
      const phone = data.phone;
  
      Logger.log("Name: " + name + ", Phone: " + phone);
  
      // Append to Google Sheet
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.appendRow([name, phone, new Date()]);
      
      // Respond with success
      return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
                           .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      // Log and respond with error
      Logger.log("Error: " + err);
      return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
                           .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  
  function doGet(e) {
    return ContentService.createTextOutput("Google Apps Script is working!")
                         .setMimeType(ContentService.MimeType.TEXT);
  }
  