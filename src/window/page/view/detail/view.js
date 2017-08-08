/******************************************************************************
 Page Detail Form

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
		this.state = { property: null }
	}

	changeJSON = (e) => {
		// convert string value to json
		let value = null
		try {
			value = JSON.parse(e.target.value)
			// update props
			this.props.onChange(e.target.id, value)
			// if json conversion success then get it from props change
			this.setState({ property: null })
		} catch(e) {
			// if json conversion failes then keep the text displaying for continue edit
			this.setState({ property: e.target.value })
		}
	}

	render() {
		let property = null

		if( this.props.selected ) {

			// form gui element list
			let element_list = []
			for ( let key in this.props.elements ) {
				let element = this.props.elements[key]
				if( !element.pages ) element.pages = {}
				if( this.props.selected.id in element.pages ) {
					element_list.push(
						<ListGroupItem key={element.id}
							onClick={ (e) => { ipcRenderer.send('element.clicked', element) } }
							className="list-group-item">
		        	{element.name}
		      	</ListGroupItem>)
				}
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
						<Col componentClass={ControlLabel} xs={2}>Property</Col>
						<Col xs={10}>
							<FormControl componentClass="textarea" id="property"
								rows={5} placeholder='{ "style": {"backgroundColor": "black"} }'
								value={this.state.property ? this.state.property : JSON.stringify(this.props.selected.property, null, 2)}
								onChange={this.changeJSON} />
						</Col>
					</FormGroup>

					<FormGroup>
						<Col componentClass={ControlLabel} xs={2}>GUI Elements</Col>
						<Col xs={10}>
							<ListGroup className="element_list">{element_list}</ListGroup>
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
