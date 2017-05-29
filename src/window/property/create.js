///
/// Create Property Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')


module.exports.create = function() {

  // window property
  var windowOptions = {
      width: 500,
      height: 600,
      minWidth: 500,
      minHeight: 500,
      title: "Property"
  }

  // create window object
  propertyWindowObject = new BrowserWindow(windowOptions)

  // remove menu
  propertyWindowObject.setMenu(null);

  // depending on the environment make different load setting
  if( process.env.NODE_ENV == "development" ) {
    // Dev Environment
    propertyWindowObject.loadURL(path.join('http://localhost:8080/window/property/index.html'))
    //propertyWindowObject.openDevTools();
  } else {
    // Production Environment
    propertyWindowObject.loadURL(path.join('file://', __dirname, '/window/property/index.html'))
  }

  // initialize when page is fully loaded
  propertyWindowObject.webContents.on('did-finish-load', function() {
  })

  // Handle when window is closed
  propertyWindowObject.on('closed', function () {
    propertyWindowObject = null
  })

  //
  return propertyWindowObject
}
