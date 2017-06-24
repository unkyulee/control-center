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

      // run initial script
      let sources = projectManager.sources()
      for( let key in sources ) {
        let source = sources[key]
        runScript(source, projectManager)
      }

      ///
      /// Listen to Data Change (List)
      ///
      ipcMain.on('sources.changed', (event, sources) => {
        projectManager.sources_update(sources)
        projectManager.send('sources.changed', sources)
      })


      ///
      /// Listen to Data Change (single source change)
      ///
      ipcMain.on('source.changed', (event, source) => {
        let sources = projectManager.sources()
        sources[source.id] = source
        projectManager.sources_update(sources)
        projectManager.send('source.changed', source)
      })


      ///
      /// Load Source
      ///
      ipcMain.on('source.reload', (event, source) => {
        // find the source reference
        let sources = projectManager.sources()

        // reload the data
        runScript(sources[source.id], projectManager)
      })


      ///
      /// Create Data Source
      ///
      ipcMain.on('source.new', (event, source) => {
        // create new ID
        if( !source ) source = {}
        source.id = String(require('uuid/v4')())
        source.name = "New Data"

        // update the project project
        let sources = projectManager.sources()
        sources[source.id] = source
        projectManager.sources_update(sources)

        // send out the update to all windows
        projectManager.send('sources.changed', sources)
        projectManager.send('source.clicked', source)
      })


      ///
      /// Delete Source
      ///
      ipcMain.on('source.delete', (event, source) => {
        // update the project project
        let sources = projectManager.sources()
        delete sources[source.id]
        projectManager.sources_update(sources)

        // send out the update to all windows
        projectManager.send('sources.changed', sources)
      })

    }

  } // return

}() // end

function runScript(source, projectManager) {
  // reload the data
  source.run_id = String(require('uuid/v4')()) // to aware duplicate handlers
  let context = {
    source: source,
    projectManager: projectManager
  }
  run.run(source.script, context)
}
