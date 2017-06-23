import { ipcRenderer } from 'electron'
import React from 'react'
import { Button } from 'react-bootstrap'


export class Element extends React.Component {
  constructor(props) {
		super(props)

    let parameter = {}
    if( this.props.element.parameter )
      parameter = this.props.element.parameter

    this.state = {
      header: parameter.header,
      text: parameter.text,
      style: parameter.style,
      headerStyle: parameter.headerStyle,
      bsStyle: parameter.bsStyle,
      bsSize: parameter.bsSize,
      disabled: parameter.disabled == null ? false : parameter.disabled
    }
	}

  onElementChanged = (event, arg)=> {
    // do only when it's same id
    if( this.props.element && this.props.element.id == arg.id ) {
      let parameter = arg.parameter
      this.setState({
        header: parameter.header,
        text: parameter.text,
        style: parameter.style,
        headerStyle: parameter.headerStyle,
        bsStyle: parameter.bsStyle,
        bsSize: parameter.bsSize,
        disabled: parameter.disabled == null ? false : parameter.disabled
      })
    }
  }

  // called when the component is loaded
  componentWillUnmount() {
    ipcRenderer.on('element.changed', this.onElementChanged)
  }
  componentDidMount() {
    ipcRenderer.removeListener('element.changed', this.onElementChanged)
  }

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  render() {
    try {
      return (
        <div>
          <span style={this.state.headerStyle}>{this.state.header}</span>
          <Button
            block
            disabled={this.state.disabled}
            style={this.state.style}
            bsStyle={this.state.bsStyle}
            bsSize={this.state.bsSize}
            onClick={this.click}>
            {this.state.text}
          </Button>
        </div>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }



}
