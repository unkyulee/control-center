/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'

import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

///
///
///
export default class SearchElementView extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
            <FormControl type="text" placeholder="Search element ..." />
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}
