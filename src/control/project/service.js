///
/// Register a event listener for Project data management
///
///

const {ipcMain} = require('electron')
const main = require('../../main.js')

const file = require('./common/file')
const recent = require('./common/recent')
const style = require('./common/style')
const script = require('./common/script')
const element = require('./common/element')



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
    state.elements.forEach( (element) => {
      // open css file and assign
      style.update(filepath, element)
      // open script file and assign
      script.update(filepath, element)
    } )
    return state

  } catch(e) {
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
/// Listen to Data Change
///
ipcMain.on('sources.changed', (event, arg) => {
  // update the project state
  state['sources'] = arg

  // send out the update to all windows
  main.windowManager.forEach( (w) => {
    // don't send the update message to the sender to avoid loop
    if ( w.webContents != event.sender.webContents )
      w.webContents.send('project.open', state)
  })
})



////////////////////////////////////////////////////////////////////////////////
///
/// Listen to Element Change
///
ipcMain.on('elements.changed', (event, arg) => {
  // update the project state
  state['elements'] = arg

  // send out the update to all windows
  main.windowManager.forEach( (w) => {
    // don't send the update message to the sender to avoid loop
    if ( w.webContents != event.sender.webContents )
      w.webContents.send('project.open', state)
  })
})


////////////////////////////////////////////////////////////////////////////////
///
/// Reload element script and css
///
ipcMain.on('element.reload', (event, arg) => {
  let index = -1
  state.elements.forEach( (element, i) => {
    if(element.id == arg.id) {
      // get current project file path
      filepath = recent.get()
      // open css file and assign
      style.update(filepath, element)
      // open script file and assign
      script.update(filepath, element)
    }
  })

  // send out the update to all windows
  main.windowManager.forEach( (w) => {
    // don't send the update message to the sender to avoid loop
    w.webContents.send('project.open', state)
  })
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
  state.elements.push(arg)

  // send out the update to all windows
  main.windowManager.forEach( (w) => {
    w.webContents.send('project.open', state)
  })
})




////////////////////////////////////////////////////////////////////////////////
///
/// Delete Element
///
ipcMain.on('element.delete', (event, arg) => {
  let index = -1
  state.elements.forEach( (element, i) => {
    if(element.id == arg.id)
      index = i
  })

  if( index != -1 ) {
    state.elements.splice(index,1)
    // send out the update to all windows
    main.windowManager.forEach( (w) => {
      // don't send the update message to the sender to avoid loop
      w.webContents.send('project.open', state)
    })
  }
})
