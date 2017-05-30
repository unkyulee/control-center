
///
/// Menu Template for Pallet Window
/// exports as PalletWindowMenu
///
const template = [
  {
    label: 'File',
    submenu: [
      /////
      { label: 'Open Project', click (item, focusedWindow) {
        (require('./file/project_open')).command(item, focusedWindow)
      } },
      /////
      { label: 'Save Project', click (item, focusedWindow) {
        (require('./file/project_save')).command(item, focusedWindow)
      } },
      /////
      { type: 'separator' },
      /////
      { label: 'Refresh', click (item, focusedWindow) {
        (require('./file/refresh')).command(item, focusedWindow)
      } },
      /////
      { type: 'separator' },
      /////
      { role: 'quit' }
    ]
  }
]

const {Menu} = require('electron')
module.exports.PalletWindowMenu = Menu.buildFromTemplate(template)
