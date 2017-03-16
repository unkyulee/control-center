import React from 'react';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

import {event, NodeEvents} from '../../event.js';

export default class ActionProperty extends React.Component {
	constructor(props) {
    super(props);
    // For our initial state, we just want
    this.state = {
			property: this.props.property,
      currAction: null
		}

		// We need to bind this to onChange so we can have
    // the proper this reference inside the method
		this.handleChange = this.handleChange.bind(this);
    this.clickAction = this.clickAction.bind(this);
		this.newAction = this.newAction.bind(this);
		this.deleteAction = this.deleteAction.bind(this);
	}

	newAction(e) {
		const defaultAction = {
			"name": "new action",
			"timer": 0,
			"script": ""
		}

		// add new action
		if ( this.state.property.action == null || this.state.property.action.length == 0 ) {
			this.state.property.action = [defaultAction]
		}
		else {
			this.state.property.action.push(defaultAction)
		}

		// update the view
		this.setState({
			property: this.state.property
		});
	}

	deleteAction(e) {
		// delete action
		const index = this.state.property.action.indexOf(this.state.currAction)
		this.state.property.action.splice(index, 1);
		// update the view
		this.setState({
			property: this.state.property,
			currAction: null
		});

	}

  clickAction(e) {
    this.setState({
			currAction: this.state.property.action[e.target.name]
		});
  }


	handleChange(e) {
		this.state.currAction[e.target.name] = e.target.value
    this.setState({
			currAction: this.state.currAction
		});
		// emit message of property changed
		event.emit(NodeEvents.PROPERTY_CHANGED, this.state.property);
  }

  render() {
    const ActionList = this.state.property.action.map((a, i) =>
        <tr key={i}>
          <td><a href="#" onClick={this.clickAction} name={i}>{a.name}</a></td>
        </tr>
    )
    return (
			<form>
        <Table>
          <thead>
            <tr>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ActionList}
						<tr>
							<td className="text-right">
								<a href="#" onClick={this.newAction}>new action</a>
							</td>
						</tr>
          </tbody>
        </Table>


        { this.state.currAction == null ? null:
        <Table>
          <thead>
            <tr>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Button>
                      <Button>name</Button>
                    </InputGroup.Button>
                    <FormControl
                      type="text" name="name"
                      value={this.state.currAction.name}
                      onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup>
                    <InputGroup.Button>
                      <Button>timer</Button>
                    </InputGroup.Button>
                    <FormControl
                      type="text" name="timer"
                      value={this.state.currAction.timer}
                      onChange={this.handleChange} />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <FormControl
                    name="script"
                    rows="10"
                    placeholder="place javascript here"
                    componentClass="textarea"
                    value={this.state.currAction.script}
                    onChange={this.handleChange} />
                </FormGroup>
              </td>
            </tr>
						<tr>
							<td className="text-right">
								<a href="#" onClick={this.deleteAction}>delete</a>
							</td>
						</tr>
          </tbody>
        </Table>
        }

			</form>
    );
  }

	// react component is rendering
	componentWillMount() {	}

	// react component is removed
	componentWillUnmount() {	}
}
