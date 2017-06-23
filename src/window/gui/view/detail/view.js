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


	convertJSON = (v) => {
		// if v is string then convert to json object
		if( typeof v == 'string' ) {
			console.log('hello')
			return JSON.parse(v)
		}
		return v
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
						<Col componentClass={ControlLabel} xs={2}>Type</Col>
						<Col xs={10}>
							<FormControl componentClass="select" placeholder="Type" id="type"
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}}
								value={this.props.selected.type}>
									{types}
							</FormControl>
						</Col>
					</FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Position</Col>
						<Col xs={4}>
							<InputGroup>
								<InputGroup.Addon>X</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="x"
									value={this.props.selected.x}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col xs={3}>
							<InputGroup>
								<InputGroup.Addon>Y</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="y"
									value={this.props.selected.y}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col xs={3}>
							<InputGroup>
								<InputGroup.Addon>Z</InputGroup.Addon>
								<FormControl type="text" placeholder="10" id="z"
									value={this.props.selected.z}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Dimension</Col>
						<Col xs={5}>
							<InputGroup>
								<InputGroup.Addon>W</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="w"
									value={this.props.selected.w}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col xs={5}>
							<InputGroup>
								<InputGroup.Addon>H</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="h"
									value={this.props.selected.h}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>

					</FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Data ID</Col>
						<Col xs={10}>
							<FormControl type="text" placeholder="Datasource ID" id="datasource_id"
								value={this.props.selected.datasource_id}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Parameter</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" rows={5} placeholder="parameter" id="parameter" defaultValue=""
								value={this.state.parameter ? this.state.parameter : JSON.stringify(this.props.selected.parameter, null, 2)}
								onChange={this.changeJSON} />
						</Col>
					</FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Pages</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" rows={5} id="pages" defaultValue=""
								value={this.state.pages ? this.state.pages : JSON.stringify(this.props.selected.pages, null, 2)}
								onChange={this.changeJSON} />
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>CSS</Col>
						<Col xs={10}>
							<FormControl type="text" placeholder="custom style filepath" id="style_path"
								value={this.props.selected.style_path}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>JS</Col>
						<Col xs={10}>
							<FormControl type="text" placeholder="script path" id="script_path"
								value={this.props.selected.script_path}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



			    <FormGroup>
			      <Col xsOffset={2} xs={6}>
							<Button type="submit" bsStyle="default"
								onClick={(e) => {
									e.preventDefault()
									ipcRenderer.send("element.reload", this.props.selected)
								}}>
			          Reload
			        </Button>
			      </Col>

						<Col xs={4} style={{textAlign:"right"}}>
							<Button bsStyle="danger"
								onClick={(e) => {
									e.preventDefault()
									ipcRenderer.send(
										"element.delete",
										this.props.selected)
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
