///
/// Open project file and return the content in JSON format
///

const file = require('../common/file')
const recent = require('../common/recent')
const style = require('../common/style')
const script = require('../common/script')
const element = require('../common/element')

const project = require('../service')

module.exports.open = function(filepath) {

  // save last opened project path
  recent.set(filepath)

  // return project content
  let content = file.get(filepath)

  // convert to json format
  try {
    project.state = JSON.parse(content)

    // add element types to the definition
    project.state.types = element.list()
    
    project.state.elements.forEach( (element) => {
      // open css file and assign
      style.update(filepath, element)

      // open script file and assign
      script.update(filepath, element)
    } )

    return project.state

  } catch(e) {
    return {}
  }

}
