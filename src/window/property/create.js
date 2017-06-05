///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')

// state keeper
const windowStateKeeper = require('../../common/windowStateKeeper/index')
const main = require('../../main.js')

//
const path = require('path')
const project = require('../../control/service')


module.exports.create = function() {
  // window state
  let windowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 650
  }, "propertyWindowObject")

  // create window object
  propertyWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'show': false,
    'title': 'Property'
  })
  windowState.manage(propertyWindowObject)

  // remove menu
  propertyWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    propertyWindowObject.loadURL(path.join('http://localhost:8080/window/property/index.html'))
    propertyWindowObject.openDevTools();
  } else {
    // Production Environment
    propertyWindowObject.loadURL(path.join('file://', __dirname, '/window/property/index.html'))
  }

  // initialize when page is fully loaded
  propertyWindowObject.webContents.on('did-finish-load', function() {

    // get recent opened project
    const recent_project = project.recent()

    if ( recent_project ) {
      // get file content
      const content = project.open(recent_project)

      // send it to the palletwindow
      propertyWindowObject.webContents.send('project.open', content)

      // send it to the palletwindow
      propertyWindowObject.webContents.send('app.init', content)
    }

  })

  // Handle when window is closed
  propertyWindowObject.on('close', function () {
    delete main.windowManager["property"]
  })

  //
  return propertyWindowObject
}
