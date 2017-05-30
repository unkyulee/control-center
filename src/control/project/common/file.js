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
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8')
  }
  catch(e) {
  }
}
