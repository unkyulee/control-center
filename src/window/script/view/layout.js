/******************************************************************************
 Main Layout of Property Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Grid, Row, Col, Button } from 'react-bootstrap'

import ToolbarView from './toolbar/view'
import EditorView from './editor/view'


///
///
///
export default class ScriptMainLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = { script: '' }
	}


		// called when the component is loaded
	  componentWillMount() {

			///
			/// Info
			///
			ipcRenderer.on('info', (event, arg) => {
				alert(arg)
	    })

			///
			/// Error
			///
			ipcRenderer.on('error', (event, arg) => {
				alert( arg )
	    })


	  }

	render() {
    return (
			<Grid>

				<Row>
					<Col xs={12} className="toolbarview">
						<ToolbarView />
					</Col>

					<Col xs={12}>
						<EditorView />
					</Col>

				</Row>
			</Grid>
    );
  }


}
