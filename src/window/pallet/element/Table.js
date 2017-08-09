import React from 'react'
import { Table } from 'react-bootstrap'
import { ipcRenderer } from 'electron'
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
    let thead = []
    let tbody = []

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

    try {
      // make table header
      if( this.props.element.parameter.headers ) {
        this.props.element.parameter.headers.forEach( (header, i) => {
          thead.push(<th width={header.width} key={i} style={header.style}>{header.text}</th>)
        })
      }

      // fetch data as json
      if ( this.props.source ) {
        // make table body
        // loop for each row in data
        this.props.source.data.forEach( (row, row_number) => {
          let tr = []
          // take value for each column
          this.props.element.parameter.headers.forEach( (header, colNumber) => {
            tr.push(<td key={colNumber} style={header.bodyStyle}>
              {filterFunc(
                {"type":"td", "colNumber": colNumber},
                this.props.element,
                String(row[header.field]))
              }
            </td>)
          })
          tbody.push(<tr
            style={filterFunc("trStyle", row, null)}
            key={row_number}>{tr}</tr>)
        })
      }


      return (
        <Table condensed responsive striped hover
          style={this.props.element.parameter.style}
          onClick={this.click}
          >
          <thead>
            <tr>{thead}</tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </Table>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

}
