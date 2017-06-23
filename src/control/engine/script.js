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
        // update the project project
        run_event(event, arg, projectManager)
      })

    }

  } // return

}() // end


function run_event(event, arg, projectManager) {

  let context = {
    run_id: String(require('uuid/v4')()),
    event: event,
    arg: arg,
    projectManager: projectManager
  }
  run.run(projectManager.script(), context)
    /*
  } catch(e) {
    let message = e.message + "\n" + (new Error()).stack
    if ( event ) event.sender.webContents.send('error', message)
  }
  */
}
