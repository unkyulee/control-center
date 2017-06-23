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
		this.state = { data: null }
	}

	changeJSON = (e) => {
		// convert string value to json
		let value = null
		try {
			value = JSON.parse(e.target.value)
			// update props
			this.props.onChange(e.target.id, value)
			// if json conversion success then get it from props change
			this.setState({ data: null })
		} catch(e) {
			// if json conversion failes then keep the text displaying for continue edit
			this.setState({ data: e.target.value })
		}
	}

	render() {
		let property = null

		if( this.props.selected ) {

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
						<Col componentClass={ControlLabel} xs={2}>Data</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" id="data"
								rows={15} placeholder='{ "data": [] }'
								value={this.state.data ? this.state.data : JSON.stringify(this.props.selected.data, null, 2)}
								onChange={this.changeJSON} />
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
