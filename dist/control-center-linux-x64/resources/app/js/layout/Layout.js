import React from 'react'
import ReactDOM from 'react-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import SplitPane from 'react-split-pane'

import ProjectTree from '../tree/ProjectTree.js'
import Content from '../content/Content.js'

// Initialize Services
import Runner from '../service/Runner.js'
import MenuService from '../service/MenuService.js'

class Layout extends React.Component {
	constructor(props) {
		super(props)

		// script runner
		var runner = new Runner()
		// file service
		var menuService = new MenuService()
	}

	render() {
    return (
				<SplitPane split="vertical" minSize={150} defaultSize={200}>
					<div  style={{
					 width: "100%",
					 height: "100%"
					}}>
						<ProjectTree />
					</div>

					<div style={{ width: "100%", height: "100%" }}>
						<Content />
					</div>
				</SplitPane>
    );
  }
}

export default DragDropContext(HTML5Backend)(Layout);
