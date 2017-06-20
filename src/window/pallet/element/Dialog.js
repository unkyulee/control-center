import { ipcRenderer } from 'electron'
import React from 'react'
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap'

const script = require('../../../control/common/run')

export class Element extends React.Component {


  constructor(props) {
		super(props)

    let parameter = {}
    if( this.props.element.parameter )
      parameter = this.props.element.parameter

    this.state = {
      show: false, // this is internal state
      style: parameter.style,
      header: parameter.header,
      headerStyle: parameter.headerStyle,
      bodyStyle: parameter.bodyStyle,
      bsSize: parameter.bsSize,
      textOK: parameter.textOK,
      body: null,
      onOK: null
    }
	}

  componentWillMount() {

    ///
    /// Handle element.changed event
    ///
    ipcRenderer.on('element.changed', (event, arg) => {
      // do only when it's same id
      if( this.props.element && this.props.element.id == arg.id ) {
        let parameter = arg.parameter
        this.setState({
          style: parameter.style,
          header: parameter.header,
          headerStyle: parameter.headerStyle,
          bodyStyel: parameter.bodyStyle,
          textOK: parameter.textOK,
          bsSize: parameter.bsSize
        })
      }
    })

    ///
    /// react to dialog open
    ///
    ipcRenderer.on('dialog.show', (event, arg) => {
      if( arg.id == this.props.element.id ) {
        if ( arg.show ) {
          // run script to get the body and button portion of the dialog
          script.run(this.props.element.script, { parent: this, arg: arg })
        }
        this.setState({ show: arg.show })
      }
    })

  }

  hide = () => { this.setState({ show: false }) }
  show = () => { this.setState({ show: true })  }

  render() {

    try {

      return (
        <Modal show={this.state.show} onHide={this.hide} bsSize={this.state.bsSize}>
          <Modal.Header>
            <Modal.Title style={this.state.headerStyle}>{this.state.header}</Modal.Title>
          </Modal.Header>

          <Modal.Body style={this.state.bodyStyle}>
            {this.state.body}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hide} bsStyle="danger">Cancel</Button>
            <Button onClick={this.state.onOK} bsStyle="success">{this.state.textOK ? this.state.textOK : "OK"}</Button>
          </Modal.Footer>
        </Modal>
      )

    } catch(err) {

      return <div>{this.props.element.id} - {err.message} - {err.stack}</div>
    }
  }



}
