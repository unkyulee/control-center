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
      let src = this.props.element.parameter.src
      // if source starts with . then replace with file://[project_path]
      if( src.startsWith(".") ) {
        const dirname = require('path').dirname(this.props.parent.project.filepath)
        src = src.replace(".", "file:///" + dirname)
      }

      return <img style={this.props.element.parameter.style} src={src} />

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
