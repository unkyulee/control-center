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

  componentWillUnmount() {}
  componentDidMount() {}

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
      if( this.props.element.datasourceId ) {
        let row = this.props.source.data[0] // default is first row
        if( this.props.element.parameter.rowId )
          row = this.props.source.data.find(o => o.id == this.props.element.parameter.rowId)

        // set text
        if( this.props.element.parameter.columnName )
          this.props.element.parameter.text = row[this.props.element.parameter.columnName]
        // set header
        if( this.props.element.parameter.columnNameHeader )
          this.props.element.parameter.header = row[this.props.element.parameter.columnNameHeader]
        // set footer
        if( this.props.element.parameter.columnNameFooter )
          this.props.element.parameter.footer = row[this.props.element.parameter.columnNameFooter]
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

      const footer = this.props.element.parameter.footer ? (
        <tfoot>
          <tr>
            <th style={filterFunc(
                "footerStyle", this.props.element,
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
        <Table
          condensed={this.props.element.parameter.condensed}
          style={this.props.element.parameter.style}
          onClick={this.click}>

          {filterFunc("header", this.props.element, header)}

          <tbody>
            <tr>
              <td style={filterFunc(
                "textStyle", this.props.element,
                this.props.element.parameter.textStyle)}>
                {this.props.element.parameter.text}</td>
            </tr>
          </tbody>

          {filterFunc("footer", this.props.element, footer)}

        </Table>
      )

    } catch(e) {
      return <div onClick={this.click}>{this.props.element.id} - {String(e)}</div>
    }
  }




}
