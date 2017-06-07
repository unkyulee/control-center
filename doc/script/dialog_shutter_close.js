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

let shutters = []
let source = context.project.sources[context.element.datasource_id]
source.data.forEach( (shutter) => {
  let checked = false
  if( context.parent.state.checked ) {
    checked = context.parent.state.checked[shutter.id]
  }

  shutters.push(
    e(b.Checkbox, {"checked": checked, "id": shutter.id, onChange: onChange}, shutter.title)
  )
})

context.body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Select shutter to close:"),
    shutters
  )
)

/*
 Set Dialog Button
*/
function onDialogClick() {
  // send open message to the script engine
  ipcRenderer.send("shutter.close", context.parent.state.checked)

  // close the dialog
  ipcRenderer.send("dialog.show", {id: context.element.id, show: false})
}

context.onOK = onDialogClick
