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
  context.parent.setState({
    value: e.target.value
  })
}


context.body = e(b.FormGroup, null,
  e(b.InputGroup, null,
    e(b.FormControl, {type:"text", value: context.parent.state.value, onChange: onChange}, null),
    e(b.InputGroup.Addon, {}, '%')
  )
)

/*
 Set Dialog Button
*/
function onDialogClick() {

  // get data source
  if( context.element && context.element.datasource_id && context.parent.state.value ) {
    let source = context.project.sources[context.element.datasource_id]
    source.data[0]['value'] = context.parent.state.value + ' %'

    // send update message
    ipcRenderer.send('source.changed', source)

    // close the dialog
    ipcRenderer.send("dialog.show", {id: context.element.id, show: false})
  }

}

context.onOK = onDialogClick
