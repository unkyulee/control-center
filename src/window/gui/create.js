///
/// Create gui Window
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
  }, "guiWindowObject")

  // create window object
  guiWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'show': false,
    'title': 'gui'
  })
  windowState.manage(guiWindowObject)

  // remove menu
  guiWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    guiWindowObject.loadURL(path.join('http://localhost:8080/window/gui/index.html'))
    guiWindowObject.openDevTools();
  } else {
    // Production Environment
    guiWindowObject.loadURL(path.join('file://', __dirname, '/index.html'))
  }

  // initialize when page is fully loaded
  guiWindowObject.webContents.on('did-finish-load', function() {
    // send it to the palletwindow
    guiWindowObject.webContents.send('project.open', project.getManager.get())
    // send it to the palletwindow
    guiWindowObject.webContents.send('app.init')
  })

  // Handle when window is closed
  guiWindowObject.on('close', function () {
    delete main.windowManager["gui"]
  })

  //
  return guiWindowObject
}
