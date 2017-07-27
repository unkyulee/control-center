const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement
const { ipcRenderer } = require('electron')


let parent = context.parent
let element = context.arg.element
let sources = context.arg.sources ? context.arg.sources : {}
let source = sources[element.parameter.shutters]
let state = context.parent.state
if( !state.checked ) state.checked = {}

/*
 Set Dialog Body
*/
function onChange(e) {
  context.parent.setState({ switch: e.target.id  })
}

let body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Switch " + element.parameter.header),
    e(b.Radio, {"name": "mode", "id": "ON", onChange: onChange}, "ON"),
    e(b.Radio, {"name": "mode", "id": "OFF", onChange: onChange}, "OFF")
  )
)

function onOK() {
  // send open message to the script engine
  const data = {
    id: element.parameter.id,
    type: element.parameter.type,
    switch: context.parent.state.switch
  }
  ipcRenderer.send("pump", data)
  console.log(data)

  // close the dialog
  ipcRenderer.send("dialog.show", {id: parent.props.element.id, show: false})
}

/*
 Set Dialog Button
*/
parent.setState({
  header: element.parameter.header,
  onOK: onOK,
  body: body
})
