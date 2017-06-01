/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'

import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

///
///
///
export default class SearchView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
      <form onSubmit={ (e) => { e.preventDefault() } }>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
            <FormControl
							type="text" placeholder="Search data sources ..."
							onChange={(e) => { this.props.onSearch(e.target.value) }}
						/>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}
