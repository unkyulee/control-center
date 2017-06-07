const request = require('request')



// handle shutter close
function handleShutterClose(event, shutters) {
  // avoid running duplicate handlers
  if( handleShutterClose.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('shutter.close', handleShutterClose)
    console.log("removing shutter.close handler " + handleShutterClose.id)
    return
  }

  let message = "Close shutter request sent for: \n"
  let url = "http://localhost:8081/api/shutter/close/"
  for( let shutter_id in shutters ) {
    let close = shutters[shutter_id]
    if( close ) {
      request(url + shutter_id)
      message += 'close shutter_id: '+ shutter_id + "\n"
    }
  }

  event.sender.webContents.send('info', message)
}



// handle shutter open
function handleShutterOpen(event, shutters) {
  // avoid running duplicate handlers
  if( handleShutterOpen.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('shutter.open', handleShutterOpen)
    console.log("removing shutter.open handler " + handleShutterOpen.id)
    return
  }

  let message = "Open shutter request sent for: \n"
  let url = "http://localhost:8081/api/shutter/open/"
  for( let shutter_id in shutters ) {
    let open = shutters[shutter_id]
    if( open ) {
      request(url + shutter_id)
      message += 'open shutter_id: '+ shutter_id + "\n"
    }
  }

  event.sender.webContents.send('info', message)
}


// get status of shutters
function handleTimerShutterStatus(element, param) {
  if( handleTimerShutterStatus.status == "busy" ) {
    return
  }
  // set this function busy
  handleTimerShutterStatus.status = "busy"


  //////////////////////////////
  // do something
  updateShutterStatusText(element, param, "Request status ...")

  // request module is used to process the yql url and return the results in JSON format
  url = "http://localhost:8081/api/shutter/status"
  request(url, function(err, resp, body) {

    // send date update message
    updateShutterStatusText(element, param, "Responded ...")

    // update data
    let response = {}
    try {
      response = JSON.parse(body)
      if ( response.status == "ok" ) {

        // update shutter data
        shutter = context.project.sources['eca742ec-866d-4ed5-b9d8-01e59ef38970']
        shutter.data.forEach( (target) => {
          response.shutter.forEach( (source) => {
            if( target.id == source.id ) {
              // update status of the shutter
              target.status = source.status
            }
          } )
        } )

        // send date update message
        updateShutterStatusText(element, param, "Response OK")

      } else {
        updateShutterStatusText(element, param, response.status)
      }
    } catch(e) {}


    // release busy status
    handleTimerShutterStatus.status = "ready"
  });



  //////////////////////////////

}

function updateShutterStatusText(element, param, text) {
  //
  param.text = text
  // set back the param in string
  element.parameter = JSON.stringify(param, null, 2)
  // update the project state
  context.project.elements[element.id] = element
  // send update message
  context.updateWindow()
}



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
    console.log("removing element.clicked handler " + handleClick.id)
    return
  }

  // check if the valve button is clicked
  if ( arg.parameter ) {
    let param = JSON.parse(arg.parameter)

    if( param.type == "gas_valve" )
      handleGasValveClick(arg, param)

    else if ( param.type == "MFC" )
      handleMFCClick(arg, param)

    else if ( param.type == "shutter_open" )
      context.updateWindow("dialog.show", {id: "9b4b42f8-ed1d-431a-a904-0f9e19d719c9", show: true})

    else if ( param.type == "shutter_close" )
      context.updateWindow("dialog.show", {id: "ce029713-e53f-40ae-9f06-a6d13e6ef0ca", show: true})
  }
}


// handle timer event
function handleTimer(event, arg) {
  // avoid running duplicate handlers
  if( handleTimer.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('element.timer', handleTimer)
    console.log("removing element.timer handler " + handleTimer.id)
    return
  }

  if( arg.parameter ) {
    let param = {}
    try { param = JSON.parse(arg.parameter) } catch(e) {}

    if( param.type == "shutter_status" )
      handleTimerShutterStatus(arg, param)
  }
}


// saving current script session - this is to avoid having same multiple handlers
if( !handleClick.id )  handleClick.id = context.project.script_run_id
if( !handleTimer.id )  handleTimer.id = context.project.script_run_id
if( !handleShutterOpen.id ) handleShutterOpen.id = context.project.script_run_id
if( !handleShutterClose.id ) handleShutterClose.id = context.project.script_run_id


// listen to element.clicked event
context.ipcMain.on('element.clicked', handleClick)

// listen to element.timer event
context.ipcMain.on('element.timer', handleTimer)

// listen to open shutter
context.ipcMain.on('shutter.open', handleShutterOpen)
context.ipcMain.on('shutter.close', handleShutterClose)
