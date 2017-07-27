import { ipcRenderer } from 'electron'
import React from 'react'
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap'

const script = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)

    this.state = { show: false }
	}

  componentWillUnmount() {
    ipcRenderer.removeListener('dialog.show', this.onDialogShow)
  }

  componentDidMount() {
    ipcRenderer.on('dialog.show', this.onDialogShow)
  }

  click = () => {
    // run onclick script if exists
    if( this.props.element.parameter.onClick ) {
      let script = this.props.parent.scripts[this.props.element.parameter.onClick]
      ipcRenderer.send("script.run", {
        script_id: script.id,
        element: this.props.element,
        source: this.props.source})
    }
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  onDialogShow = (event, arg) => {
    if( arg.id == this.props.element.id ) {
      if ( arg.show ) {
        // run script to get the body and button portion of the dialog
        if( this.props.element.parameter.initScript ) {
          let script = this.props.parent.scripts[this.props.element.parameter.initScript]
          script.run(script, { parent: this, arg: arg })
        }
      }
      this.setState({ show: arg.show })
    }
  }

  onOK = () => {
    // run onclick script if exists
    if( this.props.element.parameter.onOK ) {
      let script = this.props.parent.scripts[this.props.element.parameter.onOK]
      ipcRenderer.send("script.run", {
        script_id: script.id,
        element: this.props.element,
        source: this.props.source})
    }

    this.hide()
  }

  hide = () => { this.setState({ show: false }) }
  show = () => { this.setState({ show: true })  }

  getChildren = () => {
    let children = []

    // get elements belong to the dialog
    const elements = this.props.parent.elements
    const sources = this.props.parent.sources

    for ( let key in elements ) {
      let element = elements[key]

      // does it belong to the dialog?
      if( element.pages && this.props.element.id in element.pages ) {
        // set style
	      if( !element.z ) element.z = 10 // default Z index is 10
	      let style = {
	        left: element.x,
	        top: element.y,
	        zIndex: element.z ? element.z : 10,
	        width: element.w,
	        height: element.h
	      }

				let source = null
				if( element.datasourceId ) source = sources[element.datasourceId]
		    if( !element.type ) element.type = "TextBox"

	      // create element
				const {Element} = require('./' + element.type )
	      children.push(
	        <div key={element.id} style={style} className="element">
	          <Element element={element} source={source} parent={this.props.parent} />
	        </div>
	      )
      }
    }

    return children
  }

  render() {

    try {
      let body = this.getChildren()

      return (
        <Modal
          onHide={this.hide}
          show={this.state.show}
          bsSize={this.props.element.parameter.bsSize}
          style={this.props.element.parameter.style}
          onClick={this.click}
        >
          <Modal.Header>
            <Modal.Title
              style={this.props.element.parameter.headerStyle}
            >{this.props.element.parameter.header}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={this.props.element.parameter.bodyStyle}>
              {body}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.hide} bsStyle="danger">Cancel</Button>
            <Button onClick={this.onOK} bsStyle="success">
              {this.props.element.parameter.textOK ? this.props.element.parameter.textOK : "OK"}
            </Button>
          </Modal.Footer>
        </Modal>
      )

    } catch(err) {

      return <div onClick={this.click}>{this.props.element.id} - {err.message} - {err.stack}</div>
    }
  }



}
