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

// save global path
global.__base = __dirname + '/'

////////////////////////////////////////////////////////////////////////////////
///
/// app.on('ready'
/// Emitted when the application has finished basic startup
///
////////////////////////////////////////////////////////////////////////////////

app.on('ready', function() {
  const palletWindow = require('./control/pallet/create.js')
  palletWindow.create()
});




/*

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const path = require('path')




// FileService
const FileService = require('./js/service/FileService.js')

// load menu
require('./menu.js')
const BrowserWindow = electron.BrowserWindow
*/
