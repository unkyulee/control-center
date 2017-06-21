const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement
const { ipcRenderer } = require('electron')

/*
 Set Dialog Body
*/
function onChange(e) {
  context.parent.setState({ value: e.target.value  })
}

// set initial value
context.parent.setState({
  value: parseInt(context.arg.element.parameter.text)
})

let body = e(b.FormGroup, null,
  e(b.ControlLabel, {}, "Set flow percentage for " + context.arg.element.parameter.header),
  e(b.InputGroup, null,
    e(b.FormControl, {"type": "text", "value": context.parent.state.value, onChange: onChange}, null),
    e(b.InputGroup.Addon, {}, "%"),
  )
)

/*
 Set Dialog Button
*/
context.parent.setState({
  header: context.arg.element.parameter.header,
  onOK: () => {
    // send open message to the script engine
    const data = {
      element_id: context.arg.element.id,
      value: context.parent.state.value
    }
    ipcRenderer.send("mfc.control", data)

    // close the dialog
    ipcRenderer.send("dialog.show", {id: context.parent.props.element.id, show: false})
  },
  body: body
})
