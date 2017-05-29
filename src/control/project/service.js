///
/// Register a event listener for Project data management
///
///

const {ipcMain} = require('electron')
const main = require('../../main.js')

// Project State
let state = {}
module.exports.state = state

///
/// Listen to Element Change
///
ipcMain.on('element.changed', (event, arg) => {
  // update the project state
  state['elements'] = arg

  // send out the update to all windows
  main.windowManager.forEach( (w) => {
    // don't send the update message to the sender to avoid loop
    if ( w.webContents != event.sender.webContents )
      w.webContents.send('project.open', state)
  })
})
