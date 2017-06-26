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

      //
      // script changed
      //
      ipcMain.on('script.changed', (event, script) => {
        // update the project project
        let scripts = projectManager.scripts()
        scripts[script.id] = script
        projectManager.scripts_update(scripts)
      })

      //
      // script run
      // { script_id: script_id, element: element }
      ipcMain.on('script.run', (event, arg) => {
        let context = {
          run_id: String(require('uuid/v4')()),
          event: event,
          arg: arg,
          projectManager: projectManager
        }
        let script = projectManager.scripts()[arg.script_id]
        run.run(script.script, context)
      })

      ///
      /// Create Script
      ///
      ipcMain.on('script.new', (event, script) => {
        // create new ID
        if( !script ) script = {}
        script.id = String(require('uuid/v4')())
        script.name = "New Script"

        // update the project project
        let scripts = projectManager.scripts()
        scripts[script.id] = script
        projectManager.scripts_update(scripts)

        // send out the update to all windows
        projectManager.send('scripts.changed', scripts)
        projectManager.send('script.clicked', script)
      })


      ///
      /// Delete Script
      ///
      ipcMain.on('script.delete', (event, script) => {
        // update the project project
        let scripts = projectManager.scripts()
        delete scripts[script.id]
        projectManager.scripts_update(scripts)

        // send out the update to all windows
        projectManager.send('scripts.changed', scripts)
      })

    }

  } // return

}() // end
