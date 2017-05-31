import React from 'react'
import { Modal, Button, FormGroup, Checkbox } from 'react-bootstrap'
import { ipcRenderer } from 'electron'
import {event} from '../event/event'

export class Element extends React.Component {

  constructor(props) {
		super(props)

    let parameter = null
    try {
      parameter = JSON.parse(this.props.element.parameter)
    } catch(e) {}

    this.state = {
      showModal: false,
      parameter: parameter,
      datasource: this.props.datasource
    }
	}

  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    this.setState({ showModal: true })
  }

  change = (e) => {
    if ( this.state.datasource && this.state.datasource.data ) {
      this.state.datasource.data[e.target.id][this.state.parameter.field] = e.target.checked
    }
    this.setState({
      datasource: this.state.datasource
    })

    // send data update message to all
    ipcRenderer.send("source.changed", this.state.datasource)
  }

  render() {

    try {
      // make list of checkboxes out of data
      let body = []
      if ( this.state.datasource && this.state.datasource.data ) {
        this.state.datasource.data.forEach( (data, i) => {

          body.push(
            <Checkbox
                key={i} id={i}
                inline={this.state.parameter.inline}
                checked={data[this.state.parameter.field]}
                onChange={this.change}>

              {data.name}

            </Checkbox>
          )

        })
      }

      return (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>{this.state.parameter.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.state.parameter.description}</p>
            <FormGroup>
              {body}
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={this.close} bsStyle="primary">OK</Button>
          </Modal.Footer>
        </Modal>
      )

    } catch(e) {
      return <div>{this.props.element.id} - {String(e)}</div>
    }
  }

  // called when the component is loaded
  componentWillMount() {

    event.on('dialog.open', (args) => {
      // if id matches then open
      if( args.id == this.props.element.id ) {
        this.open()
      }

    })

  }

}
