/******************************************************************************
 Main Layout of Pallet Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'

// Custom Layouts
import { ipcRenderer } from 'electron'


///
///
///
export default class PalletMainLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = { elements: {} }
	}

	map_element(element) {
		let source = null
		if( element.datasource_id ) source = this.state.sources[element.datasource_id]
    if( !element.type ) element.type = "TextBox"

    const {Element} = require('../element/' + element.type )
    return <Element element={element} source={source} />
  }

  render() {
    let elements = []
		for ( let key in this.state.elements ) {
			let element = this.state.elements[key]
			// set style
      if( !element.z ) element.z = 10 // default Z index is 10
      let style = {
        left: element.x,
        top: element.y,
        zIndex: element.z ? element.z : 10,
        width: element.w,
        height: element.h
      }

      // create element
      elements.push(
        <div key={element.id} style={style} className="element">
          {this.map_element(element)}
        </div>
      )
		}

    return (<div>{elements}</div>)
  }

	// called when the component is loaded
	componentWillMount() {
		// set infinite max listener
		ipcRenderer.setMaxListeners(0)

		///
		/// Handle project.open event
		///
		ipcRenderer.on('project.open', (event, projectData) => {
			this.setState({
				sources: projectData.sources,
				elements: projectData.elements
			})
		})

		///
		/// Handle elements.changed event
		///
		ipcRenderer.on('elements.changed', (event, elements) => {
			this.setState({ elements: elements })
		})

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

}
