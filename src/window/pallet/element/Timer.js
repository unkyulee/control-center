import React from 'react'
import { ipcRenderer } from 'electron'
export class Element extends React.Component {
  constructor(props) {
		super(props)

    this.state = {
      interval: this.props.element.parameter.interval,
      text: this.props.element.parameter.text,
      style: this.props.element.parameter.style
    }
	}

  onElementChanged = (event, arg) => {
    // do only when it's same id
    if( this.props.element && this.props.element.id == arg.id ) {
        this.setState({
          interval: arg.parameter.interval,
          text: arg.parameter.text,
          style: arg.parameter.style
        })
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('element.changed', this.onElementChanged)
  }

  componentDidMount() {
    ipcRenderer.on('element.changed', this.onElementChanged)
    /// Initiate Timer
    this.timer = setTimeout(this.tick, 1000);
  }

  tick = () => {
    try {
      this.timer = setTimeout(this.tick, this.state.interval);
      ipcRenderer.send("element.timer", this.props.element)

    } catch (e) {
      // if first timer fails then retry 1 min later
      this.timer = setTimeout(this.tick, 60000);
    }
  }



  render() {
    try {
      return <div style={this.state.style}>{this.state.text}</div>
    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
