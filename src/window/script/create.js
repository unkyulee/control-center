///
/// Create Property Window
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
    defaultWidth: 800,
    defaultHeight: 550
  }, "scriptWindowObject")


  // create window object
  scriptWindowObject = new BrowserWindow({
    'x': windowState.x,
    'y': windowState.y,
    'width': windowState.width,
    'height': windowState.height,
    'minWidth': 500,
    'minHeight': 550,
    'show': false,
    'title': "Script"
  })
  windowState.manage(scriptWindowObject)

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
