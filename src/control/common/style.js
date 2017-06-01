///
/// Update Style Content
///

const fs = require('fs')
const path = require('path')

exports.update = function(project_path, element) {
  if ( element.style_path ) {
    try {
      // make it relative path to project path
      project_dir = path.dirname(project_path)
      style_path = element.style_path.replace('.', project_dir)
      style = fs.readFileSync(style_path, 'utf8')

      // assign style
      element.style = JSON.parse(style)
    }
    catch(e) {
      console.log(e)
    }
  } else {
    // set default value
    element.style = ""
    element.style_path = ""
  }
}
