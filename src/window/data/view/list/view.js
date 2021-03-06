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
		let sources = []

		// render elements
		if( this.props.sources ) {

			for ( let key in this.props.sources ) {
				let source = this.props.sources[key]

				if( source.id.indexOf(this.props.filter) != -1 || source.name.indexOf(this.props.filter) != -1 ) {
					sources.push(
						<ListGroupItem
								key={source.id}
								header={source.name}
								bsStyle={this.props.selected === source ? "success" : null}
								onClick={(e) => { this.props.onSelect(source) }}
								className="list-group-item">
		        	{source.data ? source.data.length : '0'} rows
		      	</ListGroupItem>)
				}
			}

		}

    return (
      <ListGroup className="element_list">
        {sources}
      </ListGroup>)

  }

}
