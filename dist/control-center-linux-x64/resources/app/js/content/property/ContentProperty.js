import React from 'react';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';

import {event, NodeEvents} from '../../event.js';

export default class ContentProperty extends React.Component {
	constructor(props) {
    super(props);
    // For our initial state, we just want
    this.state = {
			property: this.props.property
		}

		// We need to bind this to onChange so we can have
    // the proper this reference inside the method
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		this.state.property[e.target.name] = e.target.value
    this.setState({
			property: this.state.property
		});
		// emit message of property changed
		event.emit(NodeEvents.PROPERTY_CHANGED, this.state.property);
  }

  render() {
    return (
			<form>
				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Title</Button>
		        </InputGroup.Button>
		        <FormControl
							type="text" name="title"
							value={this.state.property.title}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Description</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="description"
							value={this.state.property.description}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Icon</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="icon"
							value={this.state.property.icon}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>
			</form>
    );
  }

	// react component is rendering
	componentWillMount() {	}

	// react component is removed
	componentWillUnmount() {	}
}
