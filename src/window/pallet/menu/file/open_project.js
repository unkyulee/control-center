
///
/// Menu Command - Open Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
const { dialog } = require('electron')
const fs = require('fs')

module.exports.command = function openProject(item, focusedWindow) {

  // open standard file dialog
  files = dialog.showOpenDialog(
    focusedWindow,
    {
      title: "Open Project",
      properties: ['openFile', 'singleSelections']
    }
  );


  // if file is selected
  if ( focusedWindow && files != null ) {
    // read the file content
    fs.readFile(files[0], 'utf8', function (err,data) {

      // if reading file content goes wrong then ...
      if (err) {
        return console.log(err);
      }

      // send event
      //focusedWindow.webContents.send('menu.open', data)

      // save last opened file
      //FileService.setLastOpenFile(files[0])

    });
  }

}
