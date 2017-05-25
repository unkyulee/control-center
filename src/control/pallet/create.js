
const {app, BrowserWindow} = require('electron')
const path = require('path')

///
/// Create Pallet Window
/// returns window object
///
module.exports.create = function create() {

  // window property
  var windowOptions = {
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 600,
      title: app.getName()
  }

  // create window object
  windowObject = new BrowserWindow(windowOptions)

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    windowObject.loadURL(path.join('http://localhost:8080/window/pallet/index.html'))
    windowObject.openDevTools();
  } else {
    // Production Environment
    windowObject.loadURL(path.join('file://', __dirname, '/window/pallet/index.html'))
  }


  // initialize when page is fully loaded
  windowObject.webContents.on('did-finish-load', function() {
    /*
    // load last opened file
    var lastProject = FileService.getLastOpenFile()
    mainWindow.webContents.send('menu.open', lastProject)
    */
  })


  // Handle when window is closed
  windowObject.on('closed', function () {
    windowObject = null
  })


  //
  return windowObject
}