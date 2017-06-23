
const recent = require('./common/recent')
const element = require('./common/element')
const file = require('./common/file')
const style = require('./common/style')
const script = require('./common/script')

const {ipcMain} = require('electron')

// engine
const script_engine = require('./engine/script')
const gui_engine = require('./engine/gui')
const data_engine = require('./engine/data')

// Constructor
module.exports = function() {
  const projectManager = require('./engine/manager')

  function saveProject(filepath) {
    // save last opened project path
    recent.set( filepath )
    // save project content
    file.set( filepath, projectManager.get() )
  }

  // public methods
  return {

    // recent project filepath
    recent: function() {
      return recent.get()
    },

    // load project
    load: function(filepath) {
      var projectData = {}

      recent.set(filepath) // save last opened project path
      let content = file.get(filepath) // return project content

      // convert to json format
      try { projectData = JSON.parse(content) }
      catch(err) { console.log('error converting json format: ' + err.message) }

      // load meta-data
      projectData.filepath = filepath // save project filepath
      projectData.types = element.list() // add element types to the definition

      // load scripts and style from the file
      for ( var key in projectData.elements ) {
        var e = projectData.elements[key]
        style.update(filepath, e) // open css file and assign
        script.update(filepath, e) // open script file and assign
      }

      projectManager.load(projectData)

      // initialize listeners
      script_engine.init(projectManager)
      gui_engine.init(projectManager)
      data_engine.init(projectManager)

    },

    getManager: function() {
      return projectManager
    }(),

    // Save Project
    save: function(filepath) {
      saveProject(filepath)
    },

    // new project
    new: function(filepath) {
      file.set(filepath, "{}")
    },

    // init
    init: function() {

      ///
      /// Listen to Project Save
      ///
      ipcMain.on('project.save', (event, arg) => {
        saveProject(recent.get())
        event.sender.send('info', 'Project saved.')
      })

    }

  } // return

}() // end
