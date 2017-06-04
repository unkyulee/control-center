


// handle Gas Valve
function handleGasValveClick(element, param) {
  if( param.text == "closed" ) {
    param.text = "open"
    param.bsStyle = "success"
  }
  else if( param.text == "open") {
    param.text = "closed"
    param.bsStyle = "danger"
  }
  // set back the param in string
  element.parameter = JSON.stringify(param, null, 2)
  // update the project state
  context.project.elements[element.id] = element

  // send update message
  updateWindow()
}


// handle MFC click
function handleMFCClick(element, param) {
  // if MFC 1
  if ( element.id == "8a89c89c-9eb6-4fb0-89ba-f92e17dd3f15" ) {
    // show MFC 1 dialog
    let dlg_param = context.project.elements["f087a1cd-9769-455b-b10e-d6bafe877138"].parameter
    dlg_param = JSON.parse(dlg_param)
    dlg_param.show = true
    context.project.elements["f087a1cd-9769-455b-b10e-d6bafe877138"].parameter = JSON.stringify(dlg_param, null, 2)

    updateWindow()
  }

}



// update notification
function updateWindow() {
  for( var key in context.windowManager ) {
    context.windowManager[key].webContents.send('project.open', context.project)
  }
}



// handle element click
function handleClick(event, arg) {
  // avoid running duplicate handlers
  if( handleClick.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('element.clicked', handleClick)
    return
  }

  // check if the valve button is clicked
  if ( arg.parameter ) {
    let param = JSON.parse(arg.parameter)

    if( param.type == "gas_valve" )
      handleGasValveClick(arg, param)

    else if ( param.type == "MFC" )
      handleMFCClick(arg, param)

  }
}



// saving current script session
handleClick.id = context.project.script_run_id

// listen to element.clicked event
context.ipcMain.on('element.clicked', handleClick)
