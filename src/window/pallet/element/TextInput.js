import { ipcRenderer } from 'electron'
import React from 'react'
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap'
const run = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  onChange = (e) => {
    let valueColumnName = "value"
    if( this.props.element.parameter.valueColumnName )
      valueColumnName = this.props.element.parameter.valueColumnName

    this.props.source.data[0][valueColumnName] = e.target.value
    ipcRenderer.send('source.changed', this.props.source)
  }

  defaultFilterFunc = (type, element, arg) => { return arg  }

  render() {
    try {
      let valueColumnName = "value"
      if( this.props.element.parameter.valueColumnName )
        valueColumnName = this.props.element.parameter.valueColumnName


      // get preRenderFilter
      let filterFunc = this.defaultFilterFunc
      if ( this.props.element.parameter.preRenderFilter ) {
        let script = this.props.parent.scripts[this.props.element.parameter.preRenderFilter]
        // run script
        let context = { filterFunc: null }
        run.run(script.script, context)
        // update filter func
        if( context.filterFunc ) filterFunc = context.filterFunc
      }

      return (
        <FormGroup style={this.props.element.parameter.style}>
          <ControlLabel style={this.props.element.parameter.headerStyle}>
            {this.props.element.parameter.header}
          </ControlLabel>
          <FormControl
            type="text"
            value={this.props.source.data[0][valueColumnName]}
            placeholder="this.props.element.parameter.placeholder"
            onChange={this.onChange}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.props.element.parameter.helpText}</HelpBlock>
        </FormGroup>
      )

    } catch(err) {
      return <div>{this.props.element.id} - {err.message} - {err.stack}</div>
    }
  }



}
