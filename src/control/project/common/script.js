///
/// Update Script Content
///

const fs = require('fs')
const path = require('path')

exports.update = function(project_path, element) {
  if ( element.script_path ) {
    try {
      // make it relative path to project path
      project_dir = path.dirname(project_path)
      script_path = element.script_path.replace('.', project_dir)
      element.script = fs.readFileSync(script_path, 'utf8')
    }
    catch(e) {
      console.log(e)
    }
  } else {
    // set default value
    element.script = ""
    element.script_path = ""
  }
}
