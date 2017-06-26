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
		this.state = { elements: {}, sources: {}, scripts: {}, currPage: null }
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
				elements: projectData.elements,
				scripts: projectData.scripts
			})
		})

		///
		/// Handle currPage.changed event
		///
		ipcRenderer.on('currPage.changed', (event, currPage) => {
			this.setState({ currPage: currPage })
		})

		///
		/// Handle elements.changed event
		///
		ipcRenderer.on('elements.changed', (event, elements) => {
			this.setState({ elements: elements })
		})

		///
		/// Handle element.changed event
		///
		ipcRenderer.on('element.changed', (event, element) => {
			this.state.elements[element.id] = element
			this.setState({ elements: this.state.elements })
		})

		///
		/// Handle source.changed event
		///
		ipcRenderer.on('source.changed', (event, source) => {
			this.state.sources[source.id] = source
			this.setState({ sources: this.state.sources })
		})

		///
		/// Handle script.changed event
		///
		ipcRenderer.on('script.changed', (event, script) => {
			this.state.scripts[script.id] = script
			this.setState({ scripts: this.state.scripts })
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

	map_element(element) {
		let source = null
		if( element.datasource_id ) source = this.state.sources[element.datasource_id]
    if( !element.type ) element.type = "TextBox"

    const {Element} = require('../element/' + element.type )
    return <Element element={element} source={source} scripts={this.state.scripts} />
  }

  render() {
    let elements = []
		for ( let key in this.state.elements ) {
			let element = this.state.elements[key]

			// display the element only if it belongs to current page
			if(
				("all" in element.pages) || // should appear in all pages
				(!this.state.currPage && Object.keys(element.pages).length == 0 ) || // should appear in main page
				(this.state.currPage && this.state.currPage.id in element.pages)
			) {

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
		}

    return (<div>{elements}</div>)
  }



}
