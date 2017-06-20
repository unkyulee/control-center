const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement
const { ipcRenderer } = require('electron')

/*
 Set Dialog Body
*/
function onChange(e) {
  context.parent.setState({ switch: e.target.id  })
}

let body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Switch " + context.arg.element.parameter.header),
    e(b.Radio, {"name": "mode", "id": "ON", onChange: onChange}, "ON"),
    e(b.Radio, {"name": "mode", "id": "OFF", onChange: onChange}, "OFF")
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
      switch: context.parent.state.switch
    }
    ipcRenderer.send("gas_rotary.switch", data)

    // close the dialog
    ipcRenderer.send("dialog.show", {id: context.parent.props.element.id, show: false})
  },
  body: body
})
