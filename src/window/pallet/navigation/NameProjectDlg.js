import React from 'react';

import {Modal, Button} from 'react-bootstrap';
import {Form, FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import {Col, ControlLabel} from 'react-bootstrap';

import { event, NodeEvents, ProjectEvents } from '../../../common/eventWindow/event.js'

export default class NameProjectDlg extends React.Component {
	constructor(props) {
    super(props);

    // For our initial state, we just want
    this.state = {
			name: null,
      showModal: false,
			newProject: false
		}

		// We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onClose = this.onClose.bind(this)
		this.onShow = this.onShow.bind(this)
    this.onSave = this.onSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
	}

	// Open Property Dialog
	onShow(node) {
		if ( node == null )	{
			// new project
			this.setState({
	      name: "New Project",
				showModal: true,
	      newProject: true
	    });
		}
		else {
			// rename project
			this.setState({
				name: node.module,
				showModal: true,
				newProject: false
			});
		}
	}

  onClose() {
    this.setState({ showModal: false });
  }

  onSave() {
    this.setState({ showModal: false });
    // send out message
		if ( this.state.newProject == false )
    	event.emit(ProjectEvents.RENAMED, this.state.name)
		else
			event.emit(ProjectEvents.CREATED, this.state.name)
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {

    return (
      <Modal show={this.state.showModal} onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>{this.state.name}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Project Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" value={this.state.name}
								onChange={this.handleChange} placeholder="Project name" />
            </Col>
          </FormGroup>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onSave} bsStyle="danger">Save</Button>
          <Button onClick={this.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

	// react component is rendering
	componentWillMount() {
		event.on(ProjectEvents.RENAME, this.onShow);
		event.on(ProjectEvents.NEW, this.onShow);
	}

	// react component is removed
	componentWillUnmount() {
		event.removeListener(ProjectEvents.RENAME, this.onShow);
		event.removeListener(ProjectEvents.NEW, this.onShow);
	}


}
