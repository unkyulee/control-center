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
let body = null
if( context.parent.props.project.sources ) {
  let source = context.parent.props.project.sources[context.parent.props.element.datasource_id]
  source.data.forEach( (shutter, i) => {
    let checked = false
    if( context.parent.state.checked ) {
      checked = context.parent.state.checked[shutter.id]
    }

    shutters.push(
      e(b.Checkbox, {"key": shutter.id,"checked": checked, "id": shutter.id, onChange: onChange}, shutter.title)
    )
  })
}

body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Select shutter to " + context.arg.element.parameter.text),
    shutters
  )
)

/*
 Set Dialog Button
*/
context.parent.setState({
  header: context.arg.element.parameter.text + " Shutters",
  onOK: () => {
    // send open message to the script engine
    ipcRenderer.send("shutter.switch", {
      shutters: context.parent.state.checked,
      switch: context.arg.element.parameter.text })

    // close the dialog
    ipcRenderer.send("dialog.show", {id: context.parent.props.element.id, show: false})
  },
  body: body
})
