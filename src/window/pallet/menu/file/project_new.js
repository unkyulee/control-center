
///
/// Menu Command - Save Project
/// https://github.com/electron/electron/blob/master/docs/api/dialog.md
///
/// Opens save dialog and acquire filepath, then save the content
///
const { dialog } = require('electron')
const project = require('../../../../control/project')
const recent = require('../../../../control/common/recent')

module.exports.command = function(item, focusedWindow) {

  // File Save Dialog - select new file to save the project
  filepath = dialog.showSaveDialog(
    focusedWindow,
    {
      title: "New Project",
      properties: ['saveFile'],
      defaultPath: project.recent() // display last opened directory
    }
  );

  if (focusedWindow && filepath != null) {

    // create an empty project object
    project.new(filepath)
    project.load(filepath)

  }

}
