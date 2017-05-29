///
/// Open project file and return the content in JSON format
///

const file = require('../common/file')
const recent = require('../common/recent')
const state = require('../service')

module.exports.open = function(filepath) {

  // save last opened project path
  recent.set(filepath)

  // return project content
  let content = file.get(filepath)

  // convert to json format
  try {
    state.state = JSON.parse(content)
    return state.state
  } catch(e) {
    return {}
  }

}
