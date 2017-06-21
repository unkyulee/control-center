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
const project = require('../../control/project')


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
    // send it to the palletwindow
    propertyWindowObject.webContents.send('project.open', project.getManager.get())
    // send it to the palletwindow
    propertyWindowObject.webContents.send('app.init')
  })

  // Handle when window is closed
  propertyWindowObject.on('close', function () {
    delete main.windowManager["property"]
  })

  //
  return propertyWindowObject
}
