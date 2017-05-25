
///
/// Menu Template for Pallet Window
/// exports as PalletWindowMenu
///
const template = [
  {
    label: 'File',
    submenu: [
      { label: 'Open Project', click (item, focusedWindow) {
        (require('./file/open_project')).command(item, focusedWindow)
      } },
      { label: 'Save Project', click (item, focusedWindow) {
        (require('./file/save_project')).command(item, focusedWindow)
      } },
      { type: 'separator' },
      { label: 'Refresh', click (item, focusedWindow) {
        (require('./file/refresh')).command(item, focusedWindow)
      } },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Insert',
    submenu: [
      { label: 'New Node', click (item, focusedWindow) {
        (require('./insert/new_node')).command(item, focusedWindow)
      } }
    ]
  }
]

const {Menu} = require('electron')
module.exports.PalletWindowMenu = Menu.buildFromTemplate(template)


/*
const {ipcMain} = require('electron')


const FileService = require('./js/service/FileService.js')


// Run command line
var exec = require('child_process').exec;
ipcMain.on('run.command', (event, arg) => {
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    var output = stdout + '\n' + stderr
    focusedWindow.webContents.send('menu.new_node', output)
  });
})
*/
