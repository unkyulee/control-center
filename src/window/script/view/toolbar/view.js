/******************************************************************************
 Search Element

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { ButtonToolbar, Button } from 'react-bootstrap'


///
///
///
export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props)
	}

	script_run = (e) => {
		// run script
		ipcRenderer.send( "script.run" )
	}

	render() {
		return (
      <ButtonToolbar>
        <span className="window_title">
          Script
        </span>

        <Button type="submit" bsStyle="danger"
          onClick={this.script_run}>
          Run
        </Button>

				<Button type="submit" bsStyle="success"
          onClick={(e) => {
            e.preventDefault()
            ipcRenderer.send("project.save")
          }}>
          Save
        </Button>
      </ButtonToolbar>
    )
  }

}
