/******************************************************************************
 Main Layout of Pallet Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'

// Custom Layouts
import PalletView from './pallet/view.js'
import { ipcRenderer } from 'electron'



///
///
///
export default class PalletMainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			elements: [],
			project: null
		}
	}

	render() {
    return (
				<PalletView
					project={this.state.project}
					elements={this.state.elements}
				/>
    );
  }

	// called when the component is loaded
	componentWillMount() {

		///
		/// Handle project.open event
		///
		ipcRenderer.on('project.open', (event, arg) => {
			this.setState({
				project: arg,
				elements: arg.elements
			})
		})

	}

}
