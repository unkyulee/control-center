///
/// Register a event listener for Project data management
///
///
const {ipcMain} = require('electron')


///
/// Open Project Handler
///
ipcMain.on('project.open', (event, arg) => {
  (require('./action/open_project')).handle(event, arg)
})
