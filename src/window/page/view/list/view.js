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
		let pages = []

		// render elements
		if( this.props.pages ) {

			for ( let key in this.props.pages ) {
				let page = this.props.pages[key]

				if( page.id.indexOf(this.props.filter) != -1 || page.name.indexOf(this.props.filter) != -1 ) {
					pages.push(
						<ListGroupItem
								key={page.id} bsStyle={this.props.selected === page ? "success" : null}
								onClick={(e) => { this.props.onSelect(page) }}
								className="list-group-item">
		        	{page.name}
		      	</ListGroupItem>)
				}
			}

		}

    return <ListGroup className="element_list">{pages}</ListGroup>
  }

}
