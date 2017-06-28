const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement;
const { ipcRenderer } = require('electron')

/* Parameters
*/
let element = context.arg.element
let sources = context.arg.sources ? context.arg.sources : {}
let source = sources[element.parameter.shutters]
let state = context.parent.state
if( !state.checked ) state.checked = {}

/*
 Set Dialog Body
*/
function onChange(e) {
  let checked = state.checked
  if(!state.checked) checked = {}
  checked[e.target.id] = e.target.checked
  context.parent.setState({ checked: checked })
}

let shutters = []
let body = null

source.data.forEach( (shutter, i) => {
  let checked = false
  checked = state.checked[shutter.id]
  shutters.push(
    e(b.Checkbox, {"key": shutter.id,"checked": checked, "id": shutter.id, onChange: onChange}, shutter.title)
  )
})


body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Select shutter to " + element.parameter.text),
    shutters
  )
)

/*
 Set Dialog Button
*/
context.parent.setState({
  header: element.parameter.text + " Shutters",
  onOK: () => {
    // send open message to the script engine
    ipcRenderer.send("shutter.switch", {
      shutters: state.checked,
      switch: element.parameter.text })

    // close the dialog
    ipcRenderer.send("dialog.show", {id: context.parent.props.element.id, show: false})
  },
  body: body
})
