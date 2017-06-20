import React from 'react'
import { Table } from 'react-bootstrap'
import { ipcRenderer } from 'electron'


export class Element extends React.Component {

  constructor(props) {
		super(props)

    this.state = {
      style: this.props.element.parameter.style,
      headers: this.props.element.parameter.headers
    }
	}

  // called when the component is loaded
  componentWillMount() {

      ///
      /// Handle element.changed event
      ///
      ipcRenderer.on('element.changed', (event, arg) => {
        // do only when it's same id
        if( this.props.element && this.props.element.id == arg.id ) {

            this.setState({
              style: arg.parameter.style,
              headers: arg.parameter.headers
            })
        }
      })

  }

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }


  render() {
    let thead = []
    let tbody = []

    try {
      // make table header
      if( this.state.headers ) {
        this.state.headers.forEach( (header, i) => {
          thead.push(<th width={header.width} key={i} style={header.style}>{header.text}</th>)
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
          this.state.headers.forEach( (header, col_number) => {
            tr.push(<td key={col_number} style={header.bodyStyle}>{String(row[header.field])}</td>)
          })
          tbody.push(<tr key={row_number}>{tr}</tr>)
        })
      }


      return (
        <Table condensed responsive striped hover style={this.state.style}>
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
