
function getAllEventTags() {
  try {
    const ss = openSpreadSheet();
    const eventTagsTab = ss.getSheetByName(EVENTTAG_TAB_NAME);

    var list = [];

    // Get the data range in the sheet
    var dataRange = eventTagsTab.getDataRange();

    // Get values from the range
    var values = dataRange.getValues();
    console.log(values)

    // Iterate through each row
    for (var i = 1; i < values.length; i++) {
      // Assuming tags are in the first column of the sheet
      var tag = values[i][0]; 
      list.push(tag); 
    }

    return list;

  } catch (error) {
    console.log(error.message);
    return []; // Return an empty array in case of an error
  }
}
