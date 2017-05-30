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

			property = (
				<Form horizontal>

			    <FormGroup>
			      <Col componentClass={ControlLabel} xs={2}>ID</Col>
			      <Col xs={10}>
			        <FormControl type="text" placeholder="ID" id="id"
								value={this.props.selected.id}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} xs={2}>Name</Col>
			      <Col xs={10}>
			        <FormControl type="text" placeholder="Name" id="name"
								value={this.props.selected.name}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
			      </Col>
			    </FormGroup>


					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>Data</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" id="data"
								rows={15} placeholder='{ "data": [] }'
								value={this.props.selected.data}
								onChange={(e) => {this.props.onChange(e.target.id, e.target.value)}} />
						</Col>
					</FormGroup>


			    <FormGroup>
						<Col xs={12} style={{textAlign:"right"}}>
							<Button bsStyle="danger"
								onClick={(e) => {
									e.preventDefault()
									ipcRenderer.send(
										"source.delete",
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
