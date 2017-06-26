import React from 'react'
import { ipcRenderer } from 'electron'

export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  componentWillUnmount() { }
  componentDidMount() { }

  render() {
    try {
      // if source starts with . then replace with file://[project_path]
      if( this.props.element.parameter.src.startsWith(".") ) {
        this.props.element.parameter.src.replace(".", "file:///" + project.filepath)
      }

      return <img style={this.props.element.parameter.style} src={this.props.element.parameter.src} />

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
