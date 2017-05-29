///
/// Save project file
///

const file = require('../common/file')
const recent = require('../common/recent')
const project = require('../service')

module.exports.save = function(filepath) {

  // save last opened project path
  recent.set( filepath )

  // save project content
  file.set( filepath, JSON.stringify( project.state ) )

}
