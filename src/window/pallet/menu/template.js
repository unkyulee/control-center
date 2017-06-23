
///
/// Menu Template for Pallet Window
/// exports as PalletWindowMenu
///
const template = [
  {
    label: 'File',
    submenu: [
      /////
      { label: 'New Project', click (item, focusedWindow) {
        (require('./file/project_new')).command(item, focusedWindow)
      } },
      /////
      { type: 'separator' },
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
      { role: 'quit' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      /////
      { label: 'GUI Property', click (item, focusedWindow) {
        (require('./window/toggle_visibility')).command("property")
      } },
      /////
      { label: 'Data Management', click (item, focusedWindow) {
        (require('./window/toggle_visibility')).command("data")
      } },
      /////
      { label: 'Script Editor', click (item, focusedWindow) {
        (require('./window/toggle_visibility')).command("script")
      } },
      /////
      { label: 'Page Manager', click (item, focusedWindow) {
        (require('./window/toggle_visibility')).command("page")
      } }
    ]
  }
]

const {Menu} = require('electron')
module.exports.PalletWindowMenu = Menu.buildFromTemplate(template)
