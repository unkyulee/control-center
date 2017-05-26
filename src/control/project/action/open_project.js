///
/// Open project file and return the content in JSON format
///

const project_file = require('../common/project_file')

module.exports.handle = function openProject(event, filepath) {

  // save last opened project path
  project_file.set(filepath)

  // return project content
  let content = project_file.content(filepath)

  // convert to json format
  return JSON.parse(content)

}
