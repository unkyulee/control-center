///
/// Create Pallet Window
/// returns window object
///

const {app, BrowserWindow} = require('electron')
const path = require('path')

const project = require('../../control/project/action/open')
const recent = require('../../control/project/common/recent')

module.exports.create = function() {

  // window property
  var windowOptions = {
      width: 1024,
      height: 768,
      minWidth: 800,
      minHeight: 600,
      title: app.getName()
  }

  // create window object
  palletWindowObject = new BrowserWindow(windowOptions)

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
  palletWindowObject.webContents.on('did-finish-load', function() {

    // get recent opened project
    const recent_project = recent.get()

    if ( recent_project ) {
      // get file content
      const content = project.open(recent_project)

      // send it to the palletwindow
      palletWindowObject.webContents.send('project.open', content)
    }

  })


  // Handle when window is closed
  palletWindowObject.on('closed', function () {
    palletWindowObject = null
  })


  //
  return palletWindowObject
}
