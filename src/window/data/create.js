///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

const project = require('../../control/service')

module.exports.create = function() {

  // window property
  var windowOptions = {
      width: 800,
      height: 550,
      minWidth: 500,
      minHeight: 550,
      title: "Data"
  }

  // create window object
  dataWindowObject = new BrowserWindow(windowOptions)

  // remove menu
  dataWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    dataWindowObject.loadURL(path.join('http://localhost:8080/window/data/index.html'))
    dataWindowObject.openDevTools();
  } else {
    // Production Environment
    dataWindowObject.loadURL(path.join('file://', __dirname, '/window/data/index.html'))
  }

  // initialize when page is fully loaded
  dataWindowObject.webContents.on('did-finish-load', function() {

    // get recent opened project
    const recent_project = project.recent()

    if ( recent_project ) {
      // get file content
      const content = project.open(recent_project)

      // send it to the palletwindow
      dataWindowObject.webContents.send('project.open', content)
    }

  })

  // Handle when window is closed
  dataWindowObject.on('closed', function () {
    dataWindowObject = null
  })

  //
  return dataWindowObject
}
