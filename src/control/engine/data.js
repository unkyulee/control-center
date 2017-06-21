class DataManager {
}






////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change (List)
///
ipcMain.on('sources.changed', (event, arg) => {
  // update the project project
  project['sources'] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', project)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change (single source change)
///
ipcMain.on('source.changed', (event, arg) => {
  project.sources[arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', project)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Create Data Source
///
ipcMain.on('source.new', (event, arg) => {
  // create new ID
  if( !arg ) arg = {}
  arg.id = String(require('uuid/v4')())
  arg.name = "New Data"

  // update the project project
  if ( !project.sources ) project.sources = {}
  project.sources[arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', project)
  }

  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('element.clicked', arg)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Delete Source
///
ipcMain.on('source.delete', (event, arg) => {

  delete project.sources[arg.id]

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', project)
  }
})




////////////////////////////////////////////////////////////////////////////////
///
/// Delete Element
///
ipcMain.on('element.delete', (event, arg) => {

  delete project.elements[arg.id]

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', project)
  }
})
