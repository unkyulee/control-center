///
/// Composite Element that has type, name, value
///

import { ipcRenderer } from 'electron'
import React from 'react'
import { Table } from 'react-bootstrap'

export class Element extends React.Component {

  constructor(props) {
		super(props)
	}

  render() {
    try {
      const parameter = JSON.parse(this.props.element.parameter)

      let label = parameter.label
      let name = parameter.name
      let style = parameter.style
      let value_style = parameter.value_style
      let lable_style = parameter.lable_style
      let value = null


      // get value
      if ( this.props.datasource &&
            this.props.datasource.data &&
            this.props.datasource.data.length > 0 ) {
        value = this.props.datasource.data[0][parameter.value_field]
      }

      return (
        <Table condensed style={style} onClick={this.click}>
          <thead>
            <tr>
              <th style={lable_style}>{label}</th>
              <th>{name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} style={value_style}>{value}</td>
            </tr>
          </tbody>
        </Table>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

  click = () => {
    console.log(this.props.element)
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }


}
