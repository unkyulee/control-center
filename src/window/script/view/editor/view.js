/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { FormControl, Button, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

///
///
///
export default class EditorView extends React.Component {
	constructor(props) {
		super(props)

		this.state = { script: "" }
	}

	render() {
    return (
			<Form horizontal>
					<FormControl componentClass="textarea" id="script"
						rows={20}
						value={this.state.script}
						onChange={(e) => {
							this.setState({ script: e.target.value })
							ipcRenderer.send('script.changed', e.target.value)
						}} />
			</Form>
		)
  }


	componentWillMount() {
		///
		/// Handle project.open event
		///
		ipcRenderer.on('project.open', (event, arg) => {

			if( this.state.script == "" ) {
				this.setState({
					script: arg.script
				})
			}

		})
	}

}
