import React from 'react'
import { ipcRenderer } from 'electron'

export class Element extends React.Component {

  constructor(props) {
		super(props)

    let parameter = {}
    if( this.props.element.parameter )
      parameter = this.props.element.parameter

    this.state = {
      src: parameter.src,
      style: parameter.style
    }
	}

  onElementChanged = (event, arg) => {
    // do only when it's same id
    if( this.props.element && this.props.element.id == arg.id ) {
      let parameter = arg.parameter
      this.setState({
        src: parameter.src,
        style: parameter.style
      })
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('element.changed', this.onElementChanged)
  }
  componentDidMount() {
    ipcRenderer.on('element.changed', this.onElementChanged)
  }

  render() {
    try {
      // if source starts with . then replace with file://[project_path]
      if( this.state.src.startsWith(".") ) {
        this.state.src.replace(".", "file:///"+project.filepath)
      }

      return <img style={this.state.style} src={this.state.src} />

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
