import React from 'react'
import { ipcRenderer } from 'electron'
export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  render() {
    try {
      if(!this.props.element.parameter) this.props.element.parameter = "{}"
      const parameter = JSON.parse(this.props.element.parameter)

      let style = parameter.style

      return <div style={style}>{parameter.text}</div>
    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

  tick = () => {
    try {
      if(!this.props.element.parameter) this.props.element.parameter = "{}"
      const parameter = JSON.parse(this.props.element.parameter)
      this.timer = setTimeout(this.tick, parameter.interval);
      ipcRenderer.send("element.timer", this.props.element)

    } catch (e) {
      this.timer = setTimeout(this.tick, 1000);
    }
  }

  componentDidMount() {
    console.log("registering timer")
    this.timer = setTimeout(this.tick, 1000);
  }

}
