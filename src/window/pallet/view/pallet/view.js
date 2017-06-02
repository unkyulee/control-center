///
/// Pallet view
/// Loads elements and lays out on the pallet
///

import React from 'react'


export default class PalletView extends React.Component {

  constructor(props) {
    super(props);
  }

  map_element(project, element) {
    const {Element} = require('../../element/' + element.type )

    // find data source
    const source = project.sources[element.datasource_id]

    return (
      <Element
        project={project}
        element={element}
        datasource={source} />
    )
  }


  render() {
    // render elements
    let elements = []

    if ( this.props.elements ) {
      for ( var key in this.props.elements ) {
        let element = this.props.elements[key]

        // set style
        let style = {
          left: element.x, top: element.y,
          width: element.w, height: element.h
        }
        // merge css style
        Object.assign(style, element.style)

        // create element
        elements.push(
          <div key={element.id}
            style={style}
            className="element">

            {this.map_element(this.props.project, element)}

          </div>
          )
        }
    }

    return (
      <div>
        {elements}
      </div>
    )
  }


}
