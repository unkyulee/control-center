///
/// Register a event listener for Project data management
///
///

const {ipcMain} = require('electron')
const main = require('../main.js')

const file = require('./common/file')
const recent = require('./common/recent')
const style = require('./common/style')
const script = require('./common/script')
const element = require('./common/element')
const datasource = require('./common/datasource')
const run = require('./common/run')



// Project State
let state = {}


// Save Project
function save(filepath) {
  // save last opened project path
  recent.set( filepath )
  // save project content
  file.set( filepath, state )
}
module.exports.save = save



// Open Project
function open(filepath) {

  // save last opened project path
  recent.set(filepath)
  // return project content
  let content = file.get(filepath)

  // convert to json format
  try {
    state = JSON.parse(content)

    // save project filepath
    state.filepath = filepath

    // add element types to the definition
    state.types = element.list()

    // load scripts and style from the file
    for ( var key in state.elements ) {
      var e = state.elements[key]
      // open css file and assign
      style.update(filepath, e)
      // open script file and assign
      script.update(filepath, e)
    }

    return state

  } catch(e) {
    console.log(e)
    return {}
  }

}
module.exports.open = open

// get recent opened project
module.exports.recent = recent.get


/* -----------------------------------------------------------------------------
 Event Handlers

----------------------------------------------------------------------------- */

////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Project Save
///
ipcMain.on('project.save', (event, arg) => {
  save(recent.get())
  event.sender.send('info', 'Project saved.')
})


////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change Script
///
ipcMain.on('script.changed', (event, arg) => {
  // update the project state
  state['script'] = arg
})


////////////////////////////////////////////////////////////////////////////////
///
/// Run Script
///
ipcMain.on('script.run', (event, arg) => {
  try {
    let context = {
      project: state,
      ipcMain: ipcMain,
      windowManager: main.windowManager
    }
    run.run(state.script, context)
  } catch(e) {
    let message = e.message + "\n" + (new Error()).stack
    event.sender.webContents.send('error', message)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change
///
ipcMain.on('sources.changed', (event, arg) => {
  // update the project state
  state['sources'] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', state)
  }
})



////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Data Change (single source change)
///
ipcMain.on('source.changed', (event, arg) => {
  // update the project state
  let index = datasource.index(state.sources, arg.id)
  if( index != -1 ) {
    state['sources'][index] = arg
  }

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', state)
  }
})

////////////////////////////////////////////////////////////////////////////////
///
/// Create Data Source
///
ipcMain.on('source.new', (event, arg) => {
  // create new ID
  arg.id = String(require('uuid/v4')())
  arg.name = "New Data"

  // update the project state
  state.sources.push(arg)

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', state)
  }
})




////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change (List)
///
ipcMain.on('elements.changed', (event, arg) => {
  // update the project state
  state['elements'] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', state)
  }
})


////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change (Single)
///
ipcMain.on('element.changed', (event, arg) => {
  // update the project state
  state['elements'][arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    if ( main.windowManager[key].webContents != event.sender.webContents )
      main.windowManager[key].webContents.send('project.open', state)
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
  style.update(filepath, state.elements[arg.id])
  // open script file and assign
  script.update(filepath, state.elements[arg.id])

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', state)
  }
})






////////////////////////////////////////////////////////////////////////////////
///
/// Create Element
///
ipcMain.on('element.new', (event, arg) => {
  // create new ID
  arg.id = String(require('uuid/v4')())
  arg.name = "New Element"

  // update the project state
  state.elements[arg.id] = arg

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', state)
  }
})




////////////////////////////////////////////////////////////////////////////////
///
/// Delete Element
///
ipcMain.on('element.delete', (event, arg) => {

  delete state.elements[arg.id]

  // send out the update to all windows
  for( var key in main.windowManager ) {
    main.windowManager[key].webContents.send('project.open', state)
  }
})
