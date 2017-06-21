const project = require('../project')

////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change Script
///
ipcMain.on('script.changed', (event, arg) => {
  // update the project project
  project['script'] = arg
})


////////////////////////////////////////////////////////////////////////////////
///
/// Run Script
///

function updateWindow(message, arg) {
  if (!message) message = 'project.open'
  if (!arg) arg = project

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send(message, arg)
  }
}

module.exports.run_script = function(event, arg) {
  // set script execution id
  project.script_run_id = String(require('uuid/v4')())
  try {
    let context = {
      project: project,
      ipcMain: ipcMain,
      updateWindow: updateWindow
    }
    run.run(project.script, context)
  } catch(e) {
    let message = e.message + "\n" + (new Error()).stack
    if ( event )
      event.sender.webContents.send('error', message)
  }

}

ipcMain.on('script.run', module.exports.run_script)
