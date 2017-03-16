const path = require('path')
const fs = require('fs')
const electron = require('electron')

const app = electron.app

exports.getLastOpenFile = function() {
  // load last opened file
  var lastFilepath = path.join(app.getPath('appData'), "last")
  try {
    var filepath = fs.readFileSync(lastFilepath, 'utf8')
    return fs.readFileSync(filepath, 'utf-8')
  }
  catch(e) {
    console.log(e)
  }
}


exports.getLastOpenFilepath = function() {
  // load last opened file
  var lastFilepath = path.join(app.getPath('appData'), "last")
  try {
    return fs.readFileSync(lastFilepath, 'utf8')    
  }
  catch(e) {
    console.log(e)
  }
}

exports.setLastOpenFile = function(filepath) {
  // save last opened file
  var lastFilepath = path.join(app.getPath('appData'), "last")
  try {
    fs.writeFileSync(lastFilepath, files[0], 'utf8')
  }
  catch(e) {
  }
}
