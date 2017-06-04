import React from 'react'
import { Button } from 'react-bootstrap'

import {event} from '../event/event'
import script from '../../../control/common/run'

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
      let bsStyle = parameter.bsStyle
      let bsSize = parameter.bsSize

      return (
        <Button
          style={style} block
          bsStyle={parameter.bsStyle}
          bsSize={parameter.bsSize}
          onClick={this.click}>
          {parameter.text}
        </Button>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }


  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("button.click", this.props.element)
  }


}
