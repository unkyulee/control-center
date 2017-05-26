/******************************************************************************
 Main Layout of Pallet Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'

// Custom Layouts
import PalletView from './pallet/view.js'


///
///
///
export default class PalletMainLayout extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
				<PalletView />
    );
  }
}
