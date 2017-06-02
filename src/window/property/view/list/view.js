/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


///
///
///
export default class ListView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let elements = []

		// render elements
		if( this.props.elements ) {

			for ( var key in this.props.elements ) {
				let element = this.props.elements[key]

				if( element.id.indexOf(this.props.filter) != -1 || element.name.indexOf(this.props.filter) != -1 ) {
					elements.push(
						<ListGroupItem
								key={element.id}
								header={element.name}
								bsStyle={this.props.selected === element ? "success" : null}
								onClick={(e) => { this.props.onSelect(element) }}
								className="list-group-item">
		        	{element.id}
		      	</ListGroupItem>)
				}
			}

		}

    return (
      <ListGroup className="element_list">
        {elements}
      </ListGroup>)

  }




}
