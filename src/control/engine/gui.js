const {ipcMain} = require('electron')

const recent = require('../common/recent')
const style = require('../common/style')
const script = require('../common/script')

// Constructor
module.exports = function() {
  // private value
  var projectManager = null

  // public methods
  return {
    init: function(projectManager) {
      // save project Manager
      projectManager = projectManager


      ///
      /// Listen to Element Change (List)
      ///
      ipcMain.on('elements.changed', (event, elements) => {
        // update the project project
        projectManager.elements_update(elements)
        // send out the update to all windows
        projectManager.send('elements.changed', projectManager.elements())
      })


      ///
      /// Listen to Element Change (Single)
      ///
      ipcMain.on('element.changed', (event, element) => {
        let elements = projectManager.elements()
        elements[element.id] = element
        projectManager.elements_update(elements)

        // send out the update to all windows
        projectManager.send('element.changed', element)
      })



      ///
      /// Listen to Element Clicked
      ///
      ipcMain.on('element.clicked', (event, element) => {
        projectManager.send('element.clicked', element)
      })




      ///
      /// Reload element script and css
      ///
      ipcMain.on('element.reload', (event, arg) => {

        // get current project file path
        filepath = recent.get()
        // open css file and assign
        style.update(filepath, arg)
        // open script file and assign
        script.update(filepath, arg)

        let elements = projectManager.elements()
        elements[element.id] = element
        projectManager.elements_update(elements)

        projectManager.send('element.changed', element)
      })






      ///
      /// Create Element
      ///
      ipcMain.on('element.new', (event, element) => {
        // create new ID
        if ( element == null ) element = {}
        element.id = String(require('uuid/v4')())
        element.name = "New Element"

        // update the project project
        let elements = projectManager.elements()
        elements[element.id] = element
        projectManager.elements_update(elements)

        // send out the update to all windows
        projectManager.send('elements.changed', elements)
        projectManager.send('element.clicked', element)
      })


      ///
      /// Delete Element
      ///
      ipcMain.on('element.delete', (event, element) => {
        // update the project project
        let elements = projectManager.elements()
        delete elements[element.id]
        projectManager.elements_update(elements)

        // send out the update to all windows
        projectManager.send('elements.changed', elements)
      })


      ///
      /// Dialog Control
      ///
      ipcMain.on('dialog.show', (event, arg) => {
        // send out the update to all windows
        projectManager.send('dialog.show', arg)
      })



    }

  } // return

}() // end
