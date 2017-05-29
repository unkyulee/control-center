///
/// Pallet view
/// Loads elements and lays out on the pallet
///

import React from 'react'

// element mapper
import map_element from './map_element.js'

export default class PalletView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // render elements
    let elements = null

    if ( this.props.elements ) {
      elements = []
      this.props.elements.forEach( (element) => {
        // set style
        let style = {
          left: element.x,
          top: element.y,
          width: element.w,
          height: element.h
        }
        // merge css style
        Object.assign(style, element.style)

        // create element
        elements.push(
          <div key={element.id}
            style={style}
            className="element">
            {map_element(element)}
          </div>
          )
        }
      )
    }

    return <div> {elements} </div>
  }



}
