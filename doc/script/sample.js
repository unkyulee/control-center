


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
  context.updateWindow()
}


// handle MFC click
function handleMFCClick(element, param) {
  // if MFC 1
  if ( element.id == "8a89c89c-9eb6-4fb0-89ba-f92e17dd3f15" ) {
    // show MFC 1 dialog
    context.updateWindow("dialog.show", {id: "f087a1cd-9769-455b-b10e-d6bafe877138", show: true})
  }

}




// handle element click
function handleClick(event, arg) {
  // avoid running duplicate handlers
  if( handleClick.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('element.clicked', handleClick)
    console.log("removing handler " + handleClick.id)
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
if( !handleClick.id )
  handleClick.id = context.project.script_run_id

// listen to element.clicked event
context.ipcMain.on('element.clicked', handleClick)
