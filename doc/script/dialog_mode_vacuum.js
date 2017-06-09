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


/*
<FormGroup>
  <Radio name="radioGroup" inline>
    1
  </Radio>
  {' '}
  <Radio name="radioGroup" inline>
    2
  </Radio>
  {' '}
  <Radio name="radioGroup" inline>
    3
  </Radio>
</FormGroup>
*/
context.body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Select safety mode for VACUUM controller:"),
    e(b.Radio, {"name": "mode", "id": "Primary", onChange: onChange, "inline": true}, "Primary"),
    e(b.Radio, {"name": "mode", "id": "High Risk", onChange: onChange, "inline": true}, "High Risk"),
    e(b.Radio, {"name": "mode", "id": "Glow Discharge", onChange: onChange, "inline": true}, "Glow Discharge"),
    e(b.Radio, {"name": "mode", "id": "Unsafe", onChange: onChange, "inline": true}, "Unsafe"),
    e(b.Radio, {"name": "mode", "id": "Idle", onChange: onChange, "inline": true}, "Idle"),
    e(b.Radio, {"name": "mode", "id": "Stop", onChange: onChange, "inline": true}, "Stop")
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
