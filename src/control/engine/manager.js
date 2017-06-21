const main = require('../../main')

// Constructor
module.exports = function() {
  // private value
  var projectData = {
    elements: [],
    sources: []
  }

  // public methods
  return {
    // load project
    load: function(data) {
      projectData = data
    },

    get: function() {
      return projectData
    },

    elements: function() {
      return projectData.elements ? projectData.elements : []
    },

    elements_update: function(elements) {
      projectData.elements = elements
    },

    sources : function() {
      return projectData.sources ? projectData.sources : []
    },

    sources_update: function(sources) {
      projectData.sources = sources
    },

    script: function() {
      return projectData.script
    },

    script_update: function( script ) {
      projectData.script = script
    },

    pages: function() {
      return projectData.pages
    },

    send: function(message, arg) {
      // send out the update to all windows
      for( var key in main.windowManager ) {
        try { main.windowManager[key].webContents.send(message, arg) }
        catch( err ) {
          delete main.windowManager[key]
        }
      }
    }

  } // return

}() // end
