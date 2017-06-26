import React from 'react'
import { Table } from 'react-bootstrap'
import { ipcRenderer } from 'electron'


export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  componentWillUnmount() { }
  componentDidMount() { }

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }


  render() {
    let thead = []
    let tbody = []

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
          this.props.element.parameter.headers.forEach( (header, col_number) => {
            tr.push(<td key={col_number} style={header.bodyStyle}>{String(row[header.field])}</td>)
          })
          tbody.push(<tr key={row_number}>{tr}</tr>)
        })
      }


      return (
        <Table condensed responsive striped hover style={this.props.element.parameter.style}>
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
