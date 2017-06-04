import React from 'react'

export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  render() {
    try {
      if(!this.props.element.parameter) this.props.element.parameter = "{}"
      const parameter = JSON.parse(this.props.element.parameter)

      let style = parameter.style

      // if source starts with . then replace with file://[project_path]
      if( parameter.src.startsWith(".") ) {
        parameter.src.replace(".", "file:///"+project.filepath)
      }

      return <img style={style} src={parameter.src} />
    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
