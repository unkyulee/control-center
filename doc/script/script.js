const request = require('request')
const {ipcMain} = require('electron')


///////////////////////////////////////////////////////////////////////////////
//
// Configuration
//
///////////////////////////////////////////////////////////////////////////////
const api_url = "http://localhost:8081/api/"



///////////////////////////////////////////////////////////////////////////////
//
// Shutter Open / Close
//
///////////////////////////////////////////////////////////////////////////////
function handleShutter(event, arg) {
  // avoid running duplicate handlers
  if( handleShutter.id != context.run_id ) {
    ipcMain.removeListener('shutter.close', handleShutter)
    console.log("removing shutter.switch handler " + handleShutter.id)
    return
  }

  let message = ""
  if( arg.switch == "Open" ) {
    message = "Open shutter request sent for: \n"
    let url = api_url + "shutter/open/"
    for( let shutter_id in arg.shutters ) {
      let open = arg.shutters[shutter_id]
      if( open ) {
        request(url + shutter_id)
        message += 'open shutter_id: '+ shutter_id + "\n"
      }
    }
  }
  else if( arg.switch == "Close" ) {
    message = "Close shutter request sent for: \n"
    let url = api_url + "shutter/close/"
    for( let shutter_id in arg.shutters ) {
      let close = arg.shutters[shutter_id]
      if( close ) {
        request(url + shutter_id)
        message += 'close shutter_id: '+ shutter_id + "\n"
      }
    }
  }

  // send feedback message
  event.sender.webContents.send('info', message)
}






///////////////////////////////////////////////////////////////////////////////
//
// Valve Open / Close
//
///////////////////////////////////////////////////////////////////////////////

// handle Gas Valve
function handleValveClick(element) {
  // toggle
  if( element.parameter.text == "closed" || element.parameter.text == "opening" ) {
    updateValveText(element, "opening", "info")
    let url = api_url + element.parameter.type + "/open/" + element.parameter.id
    request(url, function(err, resp, body) {
      updateValveText(element, "open", "success")
    })
  }

  else if( element.parameter.text == "open" || element.parameter.text == "closing" ) {
    updateValveText(element, "closing", "info")
    let url = api_url + element.parameter.type + "/close/" + element.parameter.id
    request(url, function(err, resp, body) {
      updateValveText(element, "closed", "danger")
    })
  }
}

function updateValveText(element, text, style) {
  element.parameter.text = text
  element.parameter.bsStyle = style

  // send update message
  context.projectManager.send("element.changed", element)
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

function handleGasRotarySwitch(event, arg) {
  // avoid running duplicate handlers
  if( handleGasRotarySwitch.id != context.run_id ) {
    ipcMain.removeListener('gas_rotary.switch', handleGasRotarySwitch)
    console.log("removing gas_rotary.switch handler " + handleGasRotarySwitch.id)
    return
  }

  // find element
  let element = context.projectManager.elements()[arg.element_id]

  // switch rotary
  if( arg.switch == "ON" ) {
    // turn on the rotary
    updatePumpText(arg.element_id, "switching", "lightblue")
    try {
      url = api_url + "gas_pump/on/" + element.parameter.id
      request(url, function(err, resp, body) {
        updatePumpText(arg.element_id, "running", "")
      })
    } catch (e) {}
  }

  else if( arg.switch == "OFF" ) {
    // turn off the rotary
    updatePumpText(arg.element_id, "stopping", "lightgray")
    try {
      url = api_url + "gas_pump/off/" + element.parameter.id
      request(url, function(err, resp, body) {
        updatePumpText(arg.element_id, "stopped", "red")
      })
    } catch (e) {}
  }

}

function updatePumpText(element_id, text, color, footer) {
  let element = context.projectManager.elements()[element_id]
  if( element ) {
    element.parameter.text = text
    element.parameter.textStyle.backgroundColor = color
    // send update message
    context.projectManager.send("element.changed", element)
  }
}





///////////////////////////////////////////////////////////////////////////////
//
// MFC
//
///////////////////////////////////////////////////////////////////////////////
const mfc = {
  1: "8a89c89c-9eb6-4fb0-89ba-f92e17dd3f15",
  2: "2c2549cd-169e-4572-b82f-b4cd873c724e",
  3: "0d4f0c50-fe05-49d2-a222-a01988dd5553",
  4: "bb010823-fde8-4913-a9ea-26b938fb8196"
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

function updateMFCtext( element_id, value ) {
  // get data id
  let element = context.projectManager.elements()[element_id]
  if( element ) {
    element.parameter.text = value + " %"
    context.projectManager.send("element.changed", element)
  }
}

// handle MFC percentage
function handleMFC( event, arg ) {
  // avoid running duplicate handlers
  if( handleMFC.id != context.run_id ) {
    ipcMain.removeListener('mfc.control', handleMFC)
    console.log("removing mfc.control handler " + handleMFC.id)
    return
  }

  try {
    let element = context.projectManager.elements()[arg.element_id]
    url = api_url + "mfc/set/" + element.parameter.id + "/" + arg.value
    request(url)
  } catch(e) {
    console.log("something wrong handleMFC: " + e)
  }

}





///////////////////////////////////////////////////////////////////////////////
//
// Gauge
//
///////////////////////////////////////////////////////////////////////////////
const gas_gauge = {
  1: "9209bed9-15b7-464a-a443-e4abc65589d9",
  2: "608325e6-4dc2-4422-874b-d598075b5fe7",
  3: "537b30ff-675d-4fcd-9450-47d99e21cd42",
  4: "0be555f9-7716-44dc-9870-8a212cf6429c",
  5: "231e1f97-00e3-4a42-8958-dcac8ad20dd7",
  6: "30d74ff0-182b-40dd-b256-5eeb042c7244",
  7: "85940608-ef34-4e35-8727-afe14a8bb38a",
  8: "70dbe149-0141-47e3-8259-9e9a6e87e465"
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

  finally {if( !handleTimer.id )  handleTimer.id = context.run_id
    // release busy status
    updateGasGauge.status = "ready"
  }
}

const vacuum_gauge = {
  1: "98d96606-40e3-4b02-bd08-965fdc2d99a8",
  2: "f7ee4a75-179d-4072-bae8-22bb02788bba",
  3: "ce63ae4c-ad75-4899-8048-2f0b8f58f4bd",
  4: "fde8446c-279a-47bf-a25c-925f4f56e78d"
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
          updateGauge( vacuum_gauge[s.id], s.pressure, s.exp )
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
  }handleMFC

}

function updateGauge(element_id, pressure, exp) {
  // get data id
  let element = context.projectManager.elements()[element_id]
  if( element ) {
    element.parameter.text = pressure
    context.projectManager.send("element.changed", element)
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
  if( handleClick.id != context.run_id ) {
    ipcMain.removeListener('element.clicked', handleClick)
    console.log("removing element.clicked handler " + handleClick.id)
    return
  }

  // check if any element clicked
  if ( arg.parameter ) {

    if( arg.parameter.type == "gas_valve" || arg.parameter.type == "vacuum_valve" )
      handleValveClick(arg)

    else if ( arg.parameter.type == "MFC" )
      context.projectManager.send("dialog.show", {id: "f087a1cd-9769-455b-b10e-d6bafe877138", show: true, element: arg})

    else if ( arg.parameter.type == "shutter" )
      context.projectManager.send("dialog.show", {id: "9b4b42f8-ed1d-431a-a904-0f9e19d719c9", show: true, element: arg})

    else if ( arg.parameter.type == "gas_pump" )
      context.projectManager.send("dialog.show", {id: "e04f2f3a-2726-4adc-9e8b-b4af808854d7", show: true, element: arg})

    else if( arg.parameter.type == "mode_gas" )
      context.projectManager.send("dialog.show", {id: "6708ab0b-d82c-4db6-97c9-97299875178a", show: true, element: arg})

    else if( arg.parameter.type == "mode_vacuum" )
      context.projectManager.send("dialog.show", {id: "55a28e26-6413-4477-bcb7-1fd06822c70a", show: true, element: arg})
  }
}


// handle timer event
function handleTimer(event, arg) {
  // avoid running duplicate handlers
  if( handleTimer.id != context.run_id ) {
    ipcMain.removeListener('element.timer', handleTimer)
    console.log("removing element.timer handler " + handleTimer.id)
    return
  }

  if( arg.parameter ) {

    // every 5 second do a global check
    if( arg.parameter.type == "status_check" ) {
      updateGasGauge()
      updateVacuumGauge()
      updateMFC()
      // updateGasPump()
      // updateVacuumPump()

    }

  }
}


// saving current script session - this is to avoid having same multiple handlers
if( !handleClick.id )  handleClick.id = context.run_id
if( !handleTimer.id )  handleTimer.id = context.run_id
if( !handleShutter.id ) handleShutter.id = context.run_id
if( !handleGasRotarySwitch.id ) handleGasRotarySwitch.id = context.run_id
if( !handleMFC.id ) handleMFC.id = context.run_id


// listen to element.clicked event
ipcMain.on('element.clicked', handleClick)

// listen to element.timer event
ipcMain.on('element.timer', handleTimer)

// listen to open shutter
ipcMain.on('shutter.switch', handleShutter)
ipcMain.on('gas_rotary.switch', handleGasRotarySwitch)
ipcMain.on('mfc.control', handleMFC)

console.log("script executed: " + context.run_id)
