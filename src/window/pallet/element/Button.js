import { ipcRenderer } from 'electron'
import React from 'react'
import { Button } from 'react-bootstrap'
const run = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  onSourceChanged = (event, source) => {

    // do only when it's same id
    let data = null
    if( this.props.element && this.props.element.datasource_id == source.id ) {
      // find the match
      source.data.forEach( (s) => {
        if( s[this.props.element.parameter.row_name] == this.props.element.parameter.row_id ) {
          data = s[this.props.element.parameter.column_name]
          // change props
          this.props.element.parameter.text = data
          ipcRenderer.send('element.changed', this.props.element)
        }
      } )

    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('source.changed', this.onSourceChanged)
  }

  componentDidMount() {
    ipcRenderer.on('source.changed', this.onSourceChanged)
  }

  click = () => {
    // run onclick script if exists
    if( this.props.element.parameter.onClick ) {
      let script = this.props.scripts[this.props.element.parameter.onClick]
      ipcRenderer.send("script.run", {script_id: script.id, element: this.props.element})
    }

    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  defaultFilterFunc = (type, element, arg) => { return arg  }

  render() {
    try {
      // get preRenderFilter
      let filterFunc = this.defaultFilterFunc
      if ( this.props.element.parameter.preRenderFilter ) {
        let script = this.props.scripts[this.props.element.parameter.preRenderFilter]
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
