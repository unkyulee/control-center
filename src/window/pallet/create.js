///
/// Create Pallet Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

// state keeper
const windowStateKeeper = require('../../common/windowStateKeeper/index')

const project = require('../../control/service')

module.exports.create = function() {
  // window state
  let windowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 768
  }, "palletWindowObject")

  // create window object
  palletWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'minWidth': 800,
    'minHeight': 600,
    'title': app.getName()
  })
  windowState.manage(palletWindowObject)

  // set menu
  var menu = require('./menu/template.js')
  palletWindowObject.setMenu(menu.PalletWindowMenu)

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    palletWindowObject.loadURL(path.join('http://localhost:8080/window/pallet/index.html'))
    palletWindowObject.openDevTools();
  } else {
    // Production Environment
    palletWindowObject.loadURL(path.join('file://', __dirname, '/window/pallet/index.html'))
  }

  // initialize when page is fully loaded
  palletWindowObject.webContents.once('did-finish-load', function() {

    // get recent opened project
    const recent_project = project.recent()

    if ( recent_project ) {
      // get file content
      const content = project.open(recent_project)

      // send it to the palletwindow
      palletWindowObject.webContents.send('project.open', content)

      // send it to the palletwindow
      palletWindowObject.webContents.send('app.init')
    }

  })

  // Handle when window is closed
  palletWindowObject.on('closed', function () {
    palletWindowObject = null
  })

  // hide instead of closing
  palletWindowObject.on('close', function (e) {
    app.quit()
  })


  //
  return palletWindowObject
}
