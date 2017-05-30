/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { FormControl, Button, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

///
///
///
export default class ListElementView extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		let property = null

		if( this.props.selected ) {
			let types = []
			console.log(this.props.types)
			if( this.props.types ) {
				this.props.types.forEach( (type) => {
					types.push(
						<option
							key={type}
							value={type}
							selected={this.props.selected.type == type ? true : false}>
							{type}</option>)
				})
			}


			property = (
				<Form horizontal>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>ID</Col>
			      <Col sm={10}>
			        <FormControl type="text" placeholder="ID" id="id"
								value={this.props.selected.id}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>Name</Col>
			      <Col sm={10}>
			        <FormControl type="text" placeholder="Name" id="name"
								value={this.props.selected.name}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
			      </Col>
			    </FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>Type</Col>
						<Col sm={10}>
							<FormControl componentClass="select" placeholder="Type" id="type"
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} >
									{types}
							</FormControl>
						</Col>
					</FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>Position</Col>
						<Col sm={5}>
							<InputGroup>
								<InputGroup.Addon>X</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="x"
									value={this.props.selected.x}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col sm={5}>
							<InputGroup>
								<InputGroup.Addon>Y</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="y"
									value={this.props.selected.y}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>Dimension</Col>
						<Col sm={5}>
							<InputGroup>
								<InputGroup.Addon>W</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="w"
									value={this.props.selected.w}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
						<Col sm={5}>
							<InputGroup>
								<InputGroup.Addon>H</InputGroup.Addon>
								<FormControl type="text" placeholder="100px" id="h"
									value={this.props.selected.h}
									onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
							</InputGroup>
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>Parameter</Col>
						<Col sm={10}>
							<FormControl componentClass="textarea" rows={5} placeholder="parameter" id="parameter"
								value={this.props.selected.parameter}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>CSS</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="custom style filepath" id="style_path"
								value={this.props.selected.style_path}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>



					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>JS</Col>
						<Col sm={10}>
							<FormControl type="text" placeholder="script path" id="script_path"
								value={this.props.selected.script_path}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>




			    <FormGroup>
			      <Col smOffset={2} sm={8}>
			        <Button type="submit" bsStyle="success">
			          Save
			        </Button>
							&nbsp;&nbsp;&nbsp;
							<Button type="submit" bsStyle="default">
			          New
			        </Button>
			      </Col>

						<Col sm={2}>
							<Button bsStyle="danger">
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
