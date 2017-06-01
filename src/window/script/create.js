///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

const project = require('../../control/project/service')

module.exports.create = function() {

  // window property
  var windowOptions = {
      width: 800,
      height: 550,
      minWidth: 500,
      minHeight: 550,
      title: "Script"
  }

  // create window object
  scriptWindowObject = new BrowserWindow(windowOptions)

  // remove menu
  scriptWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    scriptWindowObject.loadURL(path.join('http://localhost:8080/window/script/index.html'))
    scriptWindowObject.openDevTools();
  } else {
    // Production Environment
    scriptWindowObject.loadURL(path.join('file://', __dirname, '/window/script/index.html'))
  }

  // initialize when page is fully loaded
  scriptWindowObject.webContents.on('did-finish-load', function() {

    // get recent opened project
    const recent_project = project.recent()

    if ( recent_project ) {
      // get file content
      const content = project.open(recent_project)

      // send it to the palletwindow
      scriptWindowObject.webContents.send('project.open', content)
    }

  })

  // Handle when window is closed
  scriptWindowObject.on('closed', function () {
    scriptWindowObject = null
  })

  //
  return scriptWindowObject
}
