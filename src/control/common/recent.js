///
/// Get and Set last project filepath
/// information is saved in %appData%/last
///

const { app } = require('electron')
const fs = require('fs')
const path = require('path')


exports.get = function() {
  const recent_project_path = path.join(app.getPath('appData'), "last")
  try {
    return fs.readFileSync(recent_project_path, 'utf-8')
  }
  catch(e) {
    console.log(e)
  }
}

exports.set = function(filepath) {
  const recent_project_path = path.join(app.getPath('appData'), "last")
  try {
    fs.writeFileSync(recent_project_path, filepath, 'utf8')
  }
  catch(e) {
    console.log(e)
  }
}
