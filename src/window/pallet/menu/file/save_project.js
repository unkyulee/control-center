
///
/// Menu Command - Save Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
/// Opens save dialog and acquire filepath, then save the content
///
const { dialog } = require('electron')
const fs = require('fs')

module.exports.command = function saveProject(item, focusedWindow) {

  // get last open file
  // var lastProject = FileService.getLastOpenFilepath()
  var lastProject = ""

  // File Save Dialog
  filepath = dialog.showSaveDialog(
    focusedWindow,
    {
      title: "Save Project",
      properties: ['saveFile'],
      defaultPath: lastProject
    }
  );

  if (focusedWindow && filepath != null) {
    focusedWindow.webContents.send('menu.save', filepath)
  }

  // Send save project event to the pallet window
  // as sync response - arg is json object containing project information
  ipcMain.on('file.save', (event, arg) => {
    // write to file
    fs.writeFileSync(arg.filepath, JSON.stringify(arg, null, 2) , 'utf-8');

    // save last opened file
    //FileService.setLastOpenFile(arg.filepath)
  })

}
