///
/// Composite Element that has type, name, value
///

import { ipcRenderer } from 'electron'
import React from 'react'
import { Table } from 'react-bootstrap'
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

      const footer = this.props.element.parameter.footer ? (
        <tfoot>
          <tr>
            <th style={filterFunc(
                "footerStyler", this.props.element,
                this.props.element.parameter.footerStyle)}>
              {this.props.element.parameter.footer}
            </th>
          </tr>
        </tfoot>) : null

      const header = this.props.element.parameter.header ? (
        <thead>
          <tr>
            <th style={filterFunc(
                  "headerStyle", this.props.element,
                  this.props.element.parameter.headerStyle)}>
              {this.props.element.parameter.header}
            </th>
          </tr>
        </thead>
        ) : null

      return (
        <Table condensed style={this.props.element.parameter.style} onClick={this.click}>
          {header}

          <tbody>
            <tr>
              <td style={filterFunc(
                "textStyle", this.props.element,
                this.props.element.parameter.textStyle)
              }>{this.props.element.parameter.text}</td>
            </tr>
          </tbody>

          {footer}

        </Table>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }




}
