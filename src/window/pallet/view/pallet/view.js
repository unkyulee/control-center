///
/// Pallet view
/// Loads elements and lays out on the pallet
///

import React from 'react'
import { ipcRenderer } from 'electron'

// element mapper
import map_element from './map_element.js'

export default class PalletView extends React.Component {

  constructor(props) {
    super(props);

    this.state = { project: null }
  }

  render() {
    // render elements
    let elements = null

    if ( this.state.project ) {
      elements = this.state.project.elements.map((element, i) =>
        <div key={element.id} className="element">
          {map_element(element)}
        </div>
      )
    }

    return <div> {elements} </div>
  }

  // called when the component is loaded
	componentWillMount() {

    ///
    /// Handle project.open event
    ///
    ipcRenderer.on('project.open', (event, arg) => {
      this.setState({ project: arg })
      console.log(arg)
    })


	}

}
