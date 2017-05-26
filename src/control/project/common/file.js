///
/// Get and Set project content
///

const fs = require('fs')

exports.get = function(filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  }
  catch(e) {
    console.log(e)
  }
}

exports.set = function(filepath, content) {
  try {
    fs.writeFileSync(filepath, content, 'utf8')
  }
  catch(e) {
  }
}
