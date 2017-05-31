import React from 'react'
import { Button } from 'react-bootstrap'

import {event} from '../event/event'
import script from '../../../control/script/common/run'

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  click = () => {
    // run script
    if( this.props.element.script ) {
      const context = {
        message: 'button.click',
        parent: this,
        event: event
      }
      script.run(this.props.element.script, context)
    }
  }

  render() {
    try {
      const parameter = JSON.parse(this.props.element.parameter)

      return (
        <Button bsStyle={parameter.bsStyle}
          onClick={this.click}>
          {parameter.value}
        </Button>)

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
