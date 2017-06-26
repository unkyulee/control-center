import { ipcRenderer } from 'electron'
import React from 'react'
import { Button } from 'react-bootstrap'
const run = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  componentWillUnmount() { }
  componentDidMount() { }

  click = () => {
    // run onclick script if exists
    if( this.props.element.parameter.onClick ) {
      let script = this.props.parent.scripts[this.props.element.parameter.onClick]
      ipcRenderer.send("script.run", {
        script_id: script.id,
        element: this.props.element,
        source: this.props.source})
    }

    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  defaultFilterFunc = (type, element, arg) => { return arg  }

  render() {
    try {
      // find the data match
      if( this.props.element.datasource_id ) {
        let row = this.props.source.data.find(o => o.id == this.props.element.parameter.row_id)
        this.props.element.parameter.text = row[this.props.element.parameter.column_name]
      }

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
        <div>
          <span style={this.props.element.parameter.headerStyle}>
            {this.props.element.parameter.header}
          </span>
          <Button
            block
            disabled={this.props.element.parameter.disabled}
            style={this.props.element.parameter.style}
            bsStyle={filterFunc("bsStyle", this.props.element, this.props.element.parameter.bsStyle)}
            bsSize={this.props.element.parameter.bsSize}
            onClick={this.click}>
            {this.props.element.parameter.text}
          </Button>
        </div>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {err.message} - {err.stack}</div>
    }
  }



}
