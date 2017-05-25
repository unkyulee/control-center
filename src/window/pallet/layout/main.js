/******************************************************************************
 Main Layout of Pallet Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'

// React Drag and Drop
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

// React Split Pane
import SplitPane from 'react-split-pane'

// Custom Layouts
import navigation from './navigation.js'
import Content from './content.js'


///
///
///
class PalletMainLayout extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
    return (
				<SplitPane split="vertical" minSize={150} defaultSize={200}>
					<div  style={{
					 width: "100%",
					 height: "100%"
					}}>
						<navigation />
					</div>

					<div style={{ width: "100%", height: "100%" }}>
						<Content />
					</div>

				</SplitPane>
    );
  }
}


// export the main layout as drop target
export default DragDropContext(HTML5Backend)(PalletMainLayout);
