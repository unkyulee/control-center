/******************************************************************************
 Entry point of Electron App

- palletWindow: Main windows where user can manage elements and control
- scriptWindow: Manage scripts
- propertyWindow: Display and update property of elements

*******************************************************************************/

// electron instance
const electron = require('electron')

// app controls life cycle of the application
const app = electron.app

// windows
let windowManager = {}
module.exports.windowManager = windowManager


////////////////////////////////////////////////////////////////////////////////
///
/// app.on('ready'
/// Emitted when the application has finished basic startup
///
////////////////////////////////////////////////////////////////////////////////
app.on('ready', function() {
  // initialize services
  require('./control/service')

  // create pallet window
  const palletWindow = require('./window/pallet/create.js')
  windowManager['pallet'] = palletWindow.create()

  // create property window
  const propertyWindow = require('./window/property/create.js')
  windowManager['property'] = propertyWindow.create()

  // create data window
  const dataWindow = require('./window/data/create.js')
  windowManager['data'] = dataWindow.create()

  // create script window
  const scriptWindow = require('./window/script/create.js')
  windowManager['script'] = scriptWindow.create()

})




////////////////////////////////////////////////////////////////////////////////
///
/// app.on('window-all-closed'
/// Quit when all windows are closed.
///
////////////////////////////////////////////////////////////////////////////////
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
