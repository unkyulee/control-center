
///
/// Menu Command - Save Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
/// Opens save dialog and acquire filepath, then save the content
///
const { dialog } = require('electron')
const project = require('../../../../control/project/action/save')

module.exports.command = function(item, focusedWindow) {

  // File Save Dialog
  filepath = dialog.showSaveDialog(
    focusedWindow,
    {
      title: "Save Project",
      properties: ['saveFile'],
      defaultPath: project.recent() // display last opened directory
    }
  );

  if (focusedWindow && filepath != null) {

    // save project
    project.save(filepath)

  }

}
