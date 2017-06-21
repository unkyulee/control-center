
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

    sources : function() {
      return projectData.sources ? projectData.sources : []
    },

    script: function() {
      return projectData.script
    }

  } // return

}() // end