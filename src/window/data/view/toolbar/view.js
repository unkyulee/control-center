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

	render() {
		return (
      <ButtonToolbar>
        <span className="window_title">
          Data Window
        </span>
        <Button type="submit" bsStyle="success"
          onClick={(e) => {
            e.preventDefault()
            ipcRenderer.send("project.save")
          }}>
          Save
        </Button>

        <Button type="submit" bsStyle="info"
          onClick={(e) => {
          e.preventDefault()
          ipcRenderer.send(
            "source.new",
            JSON.parse(JSON.stringify(this.props.selected))
          )}}>
          New
        </Button>
      </ButtonToolbar>
    )
  }

}
