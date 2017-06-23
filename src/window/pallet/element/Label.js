///
/// Composite Element that has type, name, value
///

import { ipcRenderer } from 'electron'
import React from 'react'
import { Table } from 'react-bootstrap'

export class Element extends React.Component {

  constructor(props) {
		super(props)

    this.state = {
      style: this.props.element.parameter.style,
      header: this.props.element.parameter.header,
      headerStyle: this.props.element.parameter.headerStyle,
      text: this.props.element.parameter.text,
      textStyle: this.props.element.parameter.textStyle,
      footer: this.props.element.parameter.footer,
      footerStyle: this.props.element.parameter.footerStyle
    }
	}

  onElementChanged = (event, arg) => {
    // do only when it's same id
    if( this.props.element && this.props.element.id == arg.id ) {

        this.setState({
          style: arg.parameter.style,
          header: arg.parameter.header,
          headerStyle: arg.parameter.headerStyle,
          text: arg.parameter.text,
          textStyle: arg.parameter.textStyle,
          footer: arg.parameter.footer,
          footerStyle: arg.parameter.footerStyle
        })
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('element.changed', this.onElementChanged)
  }

  componentDidMount() {
    ipcRenderer.on('element.changed', this.onElementChanged)
  }

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  render() {
    try {

      const footer = this.state.footer ? (
        <tfoot>
          <tr>
            <th style={this.state.footerStyle}>{this.state.footer}</th>
          </tr>
        </tfoot>) : null

      const header = this.state.header ? (
        <thead>
          <tr>
            <th style={this.state.headerStyle}>{this.state.header}</th>
          </tr>
        </thead>
        ) : null

      return (
        <Table condensed style={this.state.style} onClick={this.click}>
          {header}

          <tbody>
            <tr>
              <td style={this.state.textStyle}>{this.state.text}</td>
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
