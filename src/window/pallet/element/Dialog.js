import { ipcRenderer } from 'electron'
import React from 'react'
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap'

const script = require('../../../control/common/run')

export class Element extends React.Component {


  constructor(props) {
		super(props)

    this.state = {
      show: false,
      onOK: null
    }
	}

  hide = () => {
    this.setState({
      show: false
    })
  }

  show = () => {
    this.setState({
      show: true
    })
  }


  render() {

    try {
      if(!this.props.element.parameter) this.props.element.parameter = "{}"
      const parameter = JSON.parse(this.props.element.parameter)

      // run script to get the body and button portion of the dialog
      let context = {
        body: null,
        onOK: null,
        project: this.props.project,
        element: this.props.element,
        parent: this
      }
      script.run(this.props.element.script, context)

      return (
        <Modal show={this.state.show} onHide={this.hide}>
          <Modal.Header>
            <Modal.Title>{parameter.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {context.body}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hide} bsStyle="danger">Cancel</Button>
            <Button onClick={context.onOK} bsStyle="success">{parameter.ok ? parameter.ok : "OK"}</Button>
          </Modal.Footer>
        </Modal>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

  componentWillMount() {


/*

    // initial setup of dialog
    this.setState({
      onOK: context.onOK,
      body: context.body
    })
*/

    ///
		/// Handle project.open event
		///
		ipcRenderer.on('dialog.show', (event, arg) => {
      if( arg.id == this.props.element.id ) {
  			this.setState({
          show: arg.show
        })
      }
		})



  }

}
