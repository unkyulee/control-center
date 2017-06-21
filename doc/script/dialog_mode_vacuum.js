const react = require('react')
const b = require('react-bootstrap')
const e = react.createElement
const { ipcRenderer } = require('electron')

/*
 Set Dialog Body
 "1 - IDLE",
 "2 - HIGH VACUUM",
 "3 - PRIMARY VACUUM",
 "4 - UNSAFE MODE",
 "5 - STOP",
 "6 - GLOW DISCHARGE"
*/
function onChange(e) {
  context.parent.setState({ mode: e.target.id  })
}

let body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e('p', {}, "Safety mode for Vacuum Controller"),
    e(b.Radio, {"name": "mode", "id": "1", onChange: onChange}, "IDLE"),
    e(b.Radio, {"name": "mode", "id": "2", onChange: onChange}, "HIGH VACUUM"),
    e(b.Radio, {"name": "mode", "id": "3", onChange: onChange}, "PRIMARY VACUUM"),
    e(b.Radio, {"name": "mode", "id": "4", onChange: onChange}, "UNSAFE MODE"),
    e(b.Radio, {"name": "mode", "id": "5", onChange: onChange}, "STOP"),
    e(b.Radio, {"name": "mode", "id": "6", onChange: onChange}, "GLOW DISCHARGE")
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
