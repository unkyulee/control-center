/*
context.body
context.onOK
*/

const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement;
const { ipcRenderer } = require('electron')

/*
 Set Dialog Body
*/
function onChange(e) {
  let checked = context.parent.state.checked
  if(!context.parent.state.checked) checked = {}
  checked[e.target.id] = e.target.checked
  context.parent.setState({
    checked: checked
  })
}


context.body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Select safety mode for GAS/SHUTTER controller:"),
    e(b.Radio, {"name": "mode", "id": "Idle", onChange: onChange, "inline": true}, "Idle"),
    e(b.Radio, {"name": "mode", "id": "Strn...", onChange: onChange, "inline": true}, "Strn..."),
    e(b.Radio, {"name": "mode", "id": "Start", onChange: onChange, "inline": true}, "Start"),
    e(b.Radio, {"name": "mode", "id": "Stop", onChange: onChange, "inline": true}, "Stop"),
    e(b.Radio, {"name": "mode", "id": "Shoot", onChange: onChange, "inline": true}, "Shoot")
  )
)

/*
 Set Dialog Button
*/
function onDialogClick() {
  // send open message to the script engine
  //ipcRenderer.send("shutter.close", context.parent.state.checked)

  // close the dialog
  ipcRenderer.send("dialog.show", {id: context.element.id, show: false})
}

context.onOK = onDialogClick
