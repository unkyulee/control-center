const main = require('../../main')

// Constructor
module.exports = function() {
  // private value
  var projectData = {
    elements: {},
    sources: {},
    pages: {},
    scripts: {},
    currPage: ""
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
      return projectData.elements ? projectData.elements : {}
    },

    elements_update: function(elements) {
      projectData.elements = elements
    },

    sources : function() {
      return projectData.sources ? projectData.sources : {}
    },

    sources_update: function(sources) {
      projectData.sources = sources
    },

    currPage: function() {
      return projectData.currPage ? projectData.currPage : ""
    },

    currPage_update: function(page) {
      projectData.currPage = page
    },

    pages: function() {
      return projectData.pages ? projectData.pages: {}
    },

    pages_update: function(pages) {
      projectData.pages = pages
    },

    scripts: function() {
      return projectData.scripts ? projectData.scripts: {}
    },

    scripts_update: function( scripts ) {
      projectData.scripts = scripts
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
