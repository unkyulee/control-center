const request = require('request')
const api_url = "http://localhost:8081/api/"




///////////////////////////////////////////////////////////////////////////////
//
// Shutter Open / Close
//
///////////////////////////////////////////////////////////////////////////////
function handleShutterClose(event, shutters) {
  // avoid running duplicate handlers
  if( handleShutterClose.id != context.project.script_run_id ) {
    context.ipcMain.removeListener('shutter.close', handleShutterClose)
    console.log("removing shutter.close handler " + handleShutterClose.id)
    return
  }

  let message = "Close shutter request sent for: \n"
  let url = api_url + "shutter/close/"
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
  let url = api_url + "shutter/open/"
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
  // run this function only once at a given time
  if( handleTimerShutterStatus.status == "busy" ) return

  // set this function busy
  handleTimerShutterStatus.status = "busy"

  try {
    updateShutterStatusText(element, param, "Request status ...")

    // request module is used to process the yql url and return the results in JSON format
    url = api_url + "shutter/status"
    request(url, function(err, resp, body) {

      // send date update message
      updateShutterStatusText(element, param, "Responded ...")

      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

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
      }

      else {
        updateShutterStatusText(element, param, response.status)
      }
    });

  }

  catch( err ) {
    // something going wrong
    console.log( "handleTimerShutterStatus: " + err.message )
  }

  finally {
    // release busy status
    handleTimerShutterStatus.status = "ready"
  }

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






///////////////////////////////////////////////////////////////////////////////
//
// Valve Open / Close
//
///////////////////////////////////////////////////////////////////////////////

// handle Gas Valve
function handleValveClick(element, param) {
  // toggle
  if( param.text == "closed" || param.text == "opening" ) {
    updateValveText(element, param, "opening", "info")
    let url = api_url + param.type + "/open/" + param.id
    request(url, function(err, resp, body) {
      updateValveText(element, param, "open", "success")
    })
  }

  else if( param.text == "open" || param.text == "closing" ) {
    updateValveText(element, param, "closing", "info")
    let url = api_url + param.type + "/close/" + param.id
    request(url, function(err, resp, body) {
      updateValveText(element, param, "closed", "danger")
    })
  }
}


function updateValveText(element, param, text, style) {
  param.text = text
  param.bsStyle = style

  // set back the param in string
  element.parameter = JSON.stringify(param, null, 2)
  // update the project state
  context.project.elements[element.id] = element
  // send update message
  context.updateWindow()
}






///////////////////////////////////////////////////////////////////////////////
//
// Pump
//
///////////////////////////////////////////////////////////////////////////////
const gas_pump = {
  0: "23052073-3879-49f9-aa97-4bba02dcc504",
  1: "aee9b6c9-e7fb-4dc4-b1d5-20534a02029a",
  2: "d7d92111-498a-4370-90ab-c6c1403e1bc1"
}

function updateGasPump() {
  // make this function run once at given time
  if( updateGasPump.status == "busy" ) return
  // set this function busy
  updateGasPump.status = "busy"

  try {
    url = api_url + "gas_pump/status"
    request(url, function(err, resp, body) {
      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

      status = response.pump
      if( status ) {
        status.forEach( (s) => {
          updatePumpText(gas_pump[s.id], s.status)
        } )
      }
    })
  }

  catch( err ) {
    // something going wrong
    console.log( "updateGasPump: " + err.message )
  }

  finally {
    // release busy status
    updateGasPump.status = "ready"
  }
}

const vacuum_pump = {
  0: "d445fbe0-bcd7-4f2d-9bd3-6e1498210c96",
  1: "e0737300-edec-4234-a006-29adf151c1c3",
  2: "4fbc8ee8-b43f-466b-8405-78142ea2f7fe"
}

function updateVacuumPump() {
  // make this function run once at given time
  if( updateVacuumPump.status == "busy" ) return
  // set this function busy
  updateVacuumPump.status = "busy"

  try {
    url = api_url + "vacuum_pump/status"
    request(url, function(err, resp, body) {
      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

      status = response.pump
      if( status ) {
        status.forEach( (s) => {
          updatePumpText(vacuum_pump[s.id], s.status)
        } )
      }
    })
  }

  catch( err ) {
    // something going wrong
    console.log( "updateGasPump: " + err.message )
  }

  finally {
    // release busy status
    updateVacuumPump.status = "ready"
  }
}

function updatePumpText(datasource_id, value) {
  // get data id
  let datasource = context.project.sources[datasource_id]
  if( datasource ) {
    datasource.data = [{"value": value}]
    context.updateWindow()
  }
}








///////////////////////////////////////////////////////////////////////////////
//
// MFC
//
///////////////////////////////////////////////////////////////////////////////
const mfc = {
  0: "2822c79a-ef47-4563-a0fb-0512e5a3cdca",
  1: "806032ff-f580-4e10-be02-66913e526b18",
  2: "d4b81922-23b6-4386-ae62-060cf61c5247",
  3: "f2942990-a7e2-4b07-b8f6-c56f14973e5e"
}
// handle MFC click
function updateMFC() {
  // make this function run once at given time
  if( updateMFC.status == "busy" ) return
  // set this function busy
  updateMFC.status = "busy"

  try {
    url = api_url + "mfc/status"
    request(url, function(err, resp, body) {
      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

      status = response.mfc
      if( status ) {
        status.forEach( (s) => {
          updateMFCtext(mfc[s.id], s.percentage)
        } )
      }
    })
  }

  catch( err ) {
    // something going wrong
    console.log( "updateMFC: " + err.message )
  }

  finally {
    // release busy status
    updateMFC.status = "ready"
  }
}

function updateMFCtext( datasource_id, value ) {
  // get data id
  let datasource = context.project.sources[datasource_id]
  if( datasource ) {
    datasource.data = [{"value": value + " %"}]
    context.updateWindow()
  }
}







///////////////////////////////////////////////////////////////////////////////
//
// Gauge
//
///////////////////////////////////////////////////////////////////////////////
const gas_gauge = {
  0: "56b9f592-2abe-493e-9240-25925cfb6f12",
  1: "d77a4d64-0c6f-4d58-9139-47e6b41f60be",
  2: "80ed7ded-7369-4c77-9f37-88e0e67439c8",
  3: "32aea223-4c96-4c15-94d3-a09790a454da",
  4: "3427c710-db31-4386-b081-0f70a0743f8e",
  5: "67596e87-b048-41a8-94e0-44f63c4491c8",
  6: "aad9a3b5-3f81-44fa-8a66-bc2e98713276",
  7: "b98bde9d-1544-4cf1-ac54-9e9a6354ceb3"
}



function updateGasGauge() {
  // make this function run once at given time
  if( updateGasGauge.status == "busy" ) return
  // set this function busy
  updateGasGauge.status = "busy"

  try {
    url = api_url + "gas_gauge/status"
    request(url, function(err, resp, body) {
      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

      status = response.gas_gauge
      if( status ) {
        status.forEach( (s) => {
          updateGauge(gas_gauge[s.id], s.pressure, s.exp)
        } )
      }
    })
  }

  catch( err ) {
    // something going wrong
    console.log( "updateGasGauge: " + err.message )
  }

  finally {
    // release busy status
    updateGasGauge.status = "ready"
  }
}

const vacuum_gauge = {
  0: "acd53145-03c2-48fa-89b4-1f213e61c639",
  1: "90d57c2d-6c85-4c7b-8f8c-0d4226afa962",
  2: "133f252e-a9f0-4728-bf5a-9da55d934c77",
  3: "4595017e-af61-4c5b-891d-672ba9623a39"
}
function updateVacuumGauge() {
  // make this function run once at given time
  if( updateVacuumGauge.status == "busy" ) return
  // set this function busy
  updateVacuumGauge.status = "busy"

  try {
    url = api_url + "vacuum_gauge/status"
    request(url, function(err, resp, body) {
      let response = {}
      try { response = JSON.parse(body) } catch(err) {}

      status = response.vacuum_gauge
      if( status ) {
        status.forEach( (s) => {
          updateGauge(vacuum_gauge[s.id], s.pressure, s.exp)
        } )
      }
    })
  }

  catch( err ) {
    // something going wrong
    console.log( "updateGasGauge: " + err.message )
  }

  finally {
    // release busy status
    updateVacuumGauge.status = "ready"
  }

}

function updateGauge(datasource_id, pressure, exp) {
  // get data id
  let datasource = context.project.sources[datasource_id]
  if( datasource ) {
    datasource.data = [{"value": pressure}]
    context.updateWindow()
  }
}








///////////////////////////////////////////////////////////////////////////////
//
// App Init
//
///////////////////////////////////////////////////////////////////////////////

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

    if( param.type == "gas_valve" || param.type == "vacuum_valve" )
      handleValveClick(arg, param)

    else if ( param.type == "MFC" )
      handleMFCClick(arg, param)

    else if ( param.type == "shutter_open" )
      context.updateWindow("dialog.show", {id: "9b4b42f8-ed1d-431a-a904-0f9e19d719c9", show: true})

    else if ( param.type == "shutter_close" )
      context.updateWindow("dialog.show", {id: "ce029713-e53f-40ae-9f06-a6d13e6ef0ca", show: true})

    else if( param.type == "controller_vacuum" )
      context.updateWindow("dialog.show", {id: "55a28e26-6413-4477-bcb7-1fd06822c70a", show: true})

    else if( param.type == "controller_gas" )
      context.updateWindow("dialog.show", {id: "6708ab0b-d82c-4db6-97c9-97299875178a", show: true})
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

    // every 5 second do a global check
    if( param.type == "shutter_status" ) {
      handleTimerShutterStatus(arg, param)
      updateGasGauge()
      updateVacuumGauge()
      updateMFC()
      updateGasPump()
      updateVacuumPump()
    }

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
