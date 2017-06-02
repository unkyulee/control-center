///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

const project = require('../../control/service')

const main = require('../../main.js')

// state keeper
const windowStateKeeper = require('../../common/windowStateKeeper/index')

module.exports.create = function() {

  // window state
  let windowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 550
  }, "dataWindowObject")

  // create window object
  dataWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'minWidth': 500,
    'minHeight': 550,
    'show': false,
    'title': "Data"
  })
  windowState.manage(dataWindowObject)

  // remove menu
  dataWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    dataWindowObject.loadURL(path.join('http://localhost:8080/window/data/index.html'))
    dataWindowObject.openDevTools()
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

  // hide instead of closing
  dataWindowObject.on('close', function (e) {
    delete main.windowManager["data"]
  })

  //
  return dataWindowObject
}
