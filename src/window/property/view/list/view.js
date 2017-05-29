/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


///
///
///
export default class ListElementView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let elements = []

		// render elements
		if( this.props.elements ) {
			this.props.elements.forEach( (element) => {
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
			})
		}

    return (
      <ListGroup className="element_list">
        {elements}
      </ListGroup>)

  }




}
