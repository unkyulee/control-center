///
/// Update Style Content
///

const fs = require('fs')
const path = require('path')

exports.update = function(project_path, element) {
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
}
