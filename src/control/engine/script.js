const {ipcMain} = require('electron')
const run = require('../common/run')

// Constructor
module.exports = function() {
  // private value
  var projectManager = null

  // public methods
  return {
    init: function(projectManager) {
      // save project Manager
      projectManager = projectManager

      // run script for the first time
      run_event(null, null, projectManager)

      //
      // script changed
      //
      ipcMain.on('script.changed', (event, script) => {
        // update the project project
        projectManager.script_update( script )
      })

      //
      // script run
      //
      ipcMain.on('script.run', (event, arg) => {
        console.log('script.run')
        // update the project project
        run_event(event, arg, projectManager)
      })

    }

  } // return

}() // end




function updateWindow(message, arg) {
  if (!message) message = 'project.open'
  if (!arg) arg = project

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send(message, arg)
  }
}



function run_event(event, arg, projectManager) {
  try {
    let context = {
      run_id: String(require('uuid/v4')()),
      event: event,
      arg: arg,
      projectManager: projectManager
    }
    run.run(projectManager.script(), context)
  } catch(e) {
    let message = e.message + "\n" + (new Error()).stack
    if ( event ) event.sender.webContents.send('error', message)
  }
}
