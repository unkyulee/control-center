import React from 'react'
import { Table } from 'react-bootstrap'



export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  render() {
    let thead = []
    let tbody = []

    try {
      const parameter = JSON.parse(this.props.element.parameter)

      // make table header
      if( parameter.header ) {
        parameter.header.forEach( (head, i) => {
          thead.push(<th width={head.width} key={i}>{head.name}</th>)
        })
      }

      // fetch data as json
      if ( this.props.project.sources &&
            this.props.element.datasource_id in this.props.project.sources ) {
        let source = this.props.project.sources[this.props.element.datasource_id]
        // make table body
        // loop for each row in data
        source.data.forEach( (row, row_number) => {
          let tr = []
          // take value for each column
          parameter.header.forEach( (head, col_number) => {
            tr.push(<td key={col_number}>{String(row[head.field])}</td>)
          })
          tbody.push(<tr key={row_number}>{tr}</tr>)
        })
      }


      return (
        <Table condensed responsive striped hover style={parameter.style}>
          <thead>
            <tr>
              {thead}
            </tr>
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
