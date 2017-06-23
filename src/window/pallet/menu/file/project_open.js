
///
/// Menu Command - Open Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
const { dialog } = require('electron')
const project = require('../../../../control/project')
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
    project.load(files[0])

    // send out the update to all windows
    project.getManager.send('project.open', project.getManager.get())

  }

}
