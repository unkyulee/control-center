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

// project manager
const project = require('./control/project')

////////////////////////////////////////////////////////////////////////////////
///
/// app.on('ready'
/// Emitted when the application has finished basic startup
///
////////////////////////////////////////////////////////////////////////////////
app.on('ready', function() {
  // load project
  const recent_project = project.recent()
  if ( recent_project ) {
    // get file content
    project.load(recent_project)
  }
  // init project services
  project.init()

  // create pallet window
  const palletWindow = require('./window/pallet/create.js')
  windowManager['pallet'] = palletWindow.create()

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
