///
/// Save the filepath of the last accessed project
///

const { app } = require('electron')
const fs = require('fs')
const path = require('path')

exports.get = function() {
  // load last opened file
  var lastFilepath = path.join(app.getPath('appData'), "last")
  try {
    return fs.readFileSync(lastFilepath, 'utf8')
  }
  catch(e) {
    console.log(e)
  }
}

exports.set = function(filepath) {
  // save last opened file
  var lastFilepath = path.join(app.getPath('appData'), "last")
  try {
    fs.writeFileSync(lastFilepath, files[0], 'utf8')
  }
  catch(e) {
  }
}

exports.content = function(filepath) {
  // load last opened file
  try {
    return fs.readFileSync(filepath, 'utf-8')    
  }
  catch(e) {
    console.log(e)
  }
}
