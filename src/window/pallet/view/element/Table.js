import React from 'react'
import { Table } from 'react-bootstrap'

exports.render = function(project, element) {
  let thead = []
  let tbody = []

  try {
    const parameter = JSON.parse(element.parameter)
    // make table header
    if( parameter.header ) {
      parameter.header.forEach( (head, i) => {
        thead.push(<th width={head.width} key={i}>{head.name}</th>)
      })
    }
    // make table body
    if( element.datasource_id ) {
      // find data
      let data_source = null
      project.sources.forEach( (source) => {
        if ( source.id == element.datasource_id ) {
          data_source = source
        }
      })

      // populate rows with data
      if( data_source != null ) {
        let data = JSON.parse(data_source.data)
        if ( data ) {
          data = data.data
        }

        // loop for each row in data
        data.forEach( (row, row_number) => {
          let tr = []
          // take value for each column
          parameter.header.forEach( (head, col_number) => {
            tr.push(<td key={col_number}>{row[head.field]}</td>)
          })
          tbody.push(<tr key={row_number}>{tr}</tr>)
        })

      }

    }

    return (
      <Table condensed responsive striped hover>
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
    return <div>{String(e)}</div>
  }
}
