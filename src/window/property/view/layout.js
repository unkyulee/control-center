/******************************************************************************
 Main Layout of Property Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import SearchElementView from './search/view'
import ListElementView from './list/view'
import DetailElementView from './detail/view'

///
///
///
export default class PropertyMainLayout extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
			<Grid>
				<Row>
					<Col xs={12}>
						<SearchElementView />
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<ListElementView />
					</Col>
					<Col xs={9}>
						<DetailElementView />
					</Col>
				</Row>
			</Grid>
    );
  }
}
