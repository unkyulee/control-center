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
      script = fs.readFileSync(script_path, 'utf8')

      // assign script
      element.script = JSON.parse(script)
    }
    catch(e) {
      console.log(e)
    }
  }
}
