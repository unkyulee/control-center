/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { FormControl, Button, ControlLabel } from 'react-bootstrap'
import { ListGroupItem, ListGroup } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

///
///
///
export default class DetailView extends React.Component {
	constructor(props) {
		super(props)
		this.state = { parameter: null, pages: null }
	}

	changeJSON = (e) => {

		// convert string value to json
		let value = null
		let obj = {}
		try {
			value = JSON.parse(e.target.value)
			// update props
			this.props.onChange(e.target.id, value)
			// empty state so that onChange from parent will replace
			obj[e.target.id] = null
			this.setState(obj)
		} catch(err) {
			// remain json error
			obj[e.target.id] = e.target.value
			this.setState(obj)
		}
	}

	render() {
		let property = null

		if( this.props.selected ) {

			// make types list
			let types = []
			if( this.props.types ) {
				this.props.types.forEach( (type) => {
					types.push(
						<option key={type} value={type}>{type}</option>)
				})
			}


			property = (
				<Form horizontal>

			    <FormGroup>
			      <Col componentClass={ControlLabel} xs={2}>Name</Col>
			      <Col xs={10}>
			        <FormControl type="text" placeholder="Name" id="name"
								value={this.props.selected.name}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
			      </Col>
			    </FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>ID</Col>
						<Col xs={10}>
							<FormControl type="text" placeholder="ID" id="id"
								value={this.props.selected.id}
								readOnly />
						</Col>
					</FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Script</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" rows={15} placeholder="script" id="script" defaultValue=""
								value={this.props.selected.script}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



			    <FormGroup>

						<Col xs={12} style={{textAlign:"right"}}>
							<Button bsStyle="danger"
								onClick={(e) => {
									e.preventDefault()
									ipcRenderer.send( "script.delete", this.props.selected)
								}}>
								Delete
							</Button>
						</Col>
			    </FormGroup>
			  </Form>
			)
		}

    return <div>{property}</div>
  }

}
