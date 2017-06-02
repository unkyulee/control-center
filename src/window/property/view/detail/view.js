/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { FormControl, Button, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

///
///
///
export default class DetailView extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		let property = null

		if( this.props.selected ) {
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
						<Col xs={5}>
							<InputGroup>
								<InputGroup.Addon>X</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="x"
									value={this.props.selected.x}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col xs={5}>
							<InputGroup>
								<InputGroup.Addon>Y</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="y"
									value={this.props.selected.y}
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
							<FormControl componentClass="textarea" rows={5} placeholder="parameter" id="parameter"
								value={this.props.selected.parameter}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
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
