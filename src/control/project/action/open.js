///
/// Open project file and return the content in JSON format
///

const file = require('../common/file')
const recent = require('../common/recent')


module.exports.open = function open(filepath) {

  // save last opened project path
  recent.set(filepath)

  // return project content
  let content = file.get(filepath)

  // convert to json format
  return JSON.parse(content)

}
