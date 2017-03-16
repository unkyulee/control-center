const electron = require('electron')
const path = require('path')

const BrowserWindow = electron.BrowserWindow
const app = electron.app
const globalShortcut = electron.globalShortcut

// FileService
const FileService = require('./js/service/FileService.js')

// load menu
require('./menu.js')

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {

  var windowOptions = {
      width: 1024,
      height: 768,
      minWidth: 800,      
      minHeight: 600,
      title: app.getName()
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // when page is fully loaded
    mainWindow.webContents.on('did-finish-load', function() {
      // load last opened file
      var lastProject = FileService.getLastOpenFile()
      mainWindow.webContents.send('menu.open', lastProject)
    });

    mainWindow.on('closed', function () {
      mainWindow = null
    })
});
