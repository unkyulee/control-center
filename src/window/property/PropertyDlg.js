import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';

import {event, NodeEvents} from '../../common/eventWindow/event.js';

import ContentProperty from './ContentProperty.js';
import StyleProperty from './StyleProperty.js';
import ActionProperty from './ActionProperty.js';

export default class PropertyDlg extends React.Component {
	constructor(props) {
    super(props);
    // For our initial state, we just want
    this.state = {
			showModal: false,
			currNav: "Content",
			property: props.property
		}

		// We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.close = this.close.bind(this);
		this.onShowPropertyDlg = this.onShowPropertyDlg.bind(this);
		this.onSelectNav = this.onSelectNav.bind(this);
	}

	// Open Property Dialog
	onShowPropertyDlg(property) {
		if (this.state.property.id != property.id)
			return;

		this.setState({ showModal: true });
	}

  close() {
    this.setState({ showModal: false });
  }

	// On Navigation Selected
	onSelectNav(eventKey, e) {
		e.target.activeKey = eventKey
		this.setState({ currNav: eventKey });
	}

	getCurrNav(name) {
		if ( name == null || name == "Content" ) {
			return <ContentProperty property={this.state.property} />
		}

		else if ( name == "Style" ) {
			return <StyleProperty property={this.state.property} />
		}

		else if ( name == "Action" ) {
			return <ActionProperty property={this.state.property} />
		}
	}

  render() {
		// check current navigation
		const currNav = this.getCurrNav(this.state.currNav) ;

    return (
      <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title><b>{this.state.property.title}</b> - Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<Table>
				    <tbody>
							<tr>
								<td>
									{/* menu */}
									<Nav bsStyle="pills" stacked activeKey={this.state.currNav} onSelect={this.onSelectNav}>
										<NavItem eventKey={"Content"} title="Item">Content</NavItem>
								    <NavItem eventKey={"Style"}>Style</NavItem>
								    <NavItem eventKey={"Action"}>Action</NavItem>
								  </Nav>
								</td>

								{/* content */}
					      <td>
									{currNav}
								</td>
							</tr>
				    </tbody>
				  </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

	// react component is rendering
	componentWillMount() {
		event.on(NodeEvents.SHOW_PROPERTY_DLG, this.onShowPropertyDlg);
	}

	// react component is removed
	componentWillUnmount() {
		event.removeListener(NodeEvents.SHOW_PROPERTY_DLG, this.onShowPropertyDlg);
	}


}
