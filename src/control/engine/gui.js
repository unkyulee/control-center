class GuiManager {
}




////////////////////////////////////////////////////////////////////////////////
///
/// Set visibility to dialog
///
ipcMain.on('dialog.show', (event, arg) => {
  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('dialog.show', arg)
  }
})






////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change (List)
///
ipcMain.on('elements.changed', (event, arg) => {
  // update the project project
  project['elements'] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', project)
  }
})


////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change (Single)
///
ipcMain.on('element.changed', (event, arg) => {
  // update the project project
  project['elements'][arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('element.changed', arg)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change (Single)
///
ipcMain.on('element.clicked', (event, arg) => {

  // update the project project
  project['elements'][arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('element.clicked', arg)
  }
})




////////////////////////////////////////////////////////////////////////////////
///
/// Reload element script and css
///
ipcMain.on('element.reload', (event, arg) => {

  // get current project file path
  filepath = recent.get()
  // open css file and assign
  style.update(filepath, arg)
  // open script file and assign
  script.update(filepath, arg)

  project.elements[arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', project)
  }
})






////////////////////////////////////////////////////////////////////////////////
///
/// Create Element
///
ipcMain.on('element.new', (event, arg) => {
  // create new ID
  if ( arg == null ) arg = {}
  arg.id = String(require('uuid/v4')())
  arg.name = "New Element"

  // update the project project
  if( !project.elements ) project.elements = {}
  project.elements[arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    try {
      main.windowManager[key].webContents.send('project.open', project)
    } catch (e) {
      delete main.windowManager[key]
    }
  }
})
