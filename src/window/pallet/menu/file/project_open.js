
///
/// Menu Command - Open Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
const { dialog } = require('electron')
const project = require('../../../../control/service')
const main = require('../../../../main.js')

module.exports.command = function(item, focusedWindow) {

  // open standard file dialog
  files = dialog.showOpenDialog(
    focusedWindow,
    { // open dialog options
      title: "Open Project",
      properties: ['openFile', 'singleSelections']
    }
  )

  // if file is selected
  if ( focusedWindow && files != null ) {

    // get file content
    const content = project.open(files[0])

    // send out the update to all windows
    for( var key in main.windowManager ) {
      main.windowManager[key].webContents.send('project.open', content)
    }

  }

}
