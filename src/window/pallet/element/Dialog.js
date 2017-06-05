import { ipcRenderer } from 'electron'
import React from 'react'
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap'

const script = require('../../../control/common/run')

export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  hide = () => {
    // hide the dialog
    this.setState({show: false})

    // update the property
    if(!this.props.element.parameter) this.props.element.parameter = "{}"
    let parameter = JSON.parse(this.props.element.parameter)
    parameter.show = false

    this.props.element.parameter = JSON.stringify(parameter, null, 2)

    // sends out a message that a dialog state is changed
    ipcRenderer.send("element.changed", this.props.element)
  }

  render() {
    try {
      if(!this.props.element.parameter) this.props.element.parameter = "{}"
      const parameter = JSON.parse(this.props.element.parameter)

      // run script to get the body and button portion of the dialog
      let context = {
        body: null,
        button: null,
        element: this.props.element
      }
      script.run(this.props.element.script, context)

      return (
        <Modal show={parameter.show} onHide={this.hide}>
          <Modal.Header>
            <Modal.Title>{parameter.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {context.body}
          </Modal.Body>

          <Modal.Footer>
            {context.button}
            <Button onClick={this.hide}>Cancel</Button>
            <Button>OK</Button>
          </Modal.Footer>
        </Modal>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
