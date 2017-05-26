
///
/// Menu Command - Open Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
const { dialog } = require('electron')
const open_project = require('../../../../control/project/action/open_project')

module.exports.command = function openProject(item, focusedWindow) {

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
    const project = open_project.handle(null, files[0])

    // send it to the palletwindow
    focusedWindow.webContents.send('project.open', project)
  }

}
