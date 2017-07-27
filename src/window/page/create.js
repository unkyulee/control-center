///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

const project = require('../../control/project')

const main = require('../../main.js')

// state keeper
const windowStateKeeper = require('../../common/windowStateKeeper/index')

module.exports.create = function() {

  // window state
  let windowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 550
  }, "pageWindowObject")

  // create window object
  pageWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'minWidth': 500,
    'minHeight': 550,
    'show': false,
    'title': "Page Manager"
  })
  windowState.manage(pageWindowObject)

  // remove menu
  pageWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    pageWindowObject.loadURL(path.join('http://localhost:8080/window/page/index.html'))
    pageWindowObject.openDevTools()
  } else {
    // Production Environment
    pageWindowObject.loadURL(path.join('file://', __dirname, '/index.html'))
  }

  // initialize when page is fully loaded
  pageWindowObject.webContents.on('did-finish-load', function() {
    // send it to the palletwindow
    pageWindowObject.webContents.send('project.open', project.getManager.get())
  })

  // Handle when window is closed
  pageWindowObject.on('closed', function () {
    pageWindowObject = null
  })

  // hide instead of closing
  pageWindowObject.on('close', function (e) {
    delete main.windowManager["page"]
  })

  //
  return pageWindowObject
}
