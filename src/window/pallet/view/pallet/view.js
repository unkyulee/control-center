///
/// Pallet view
/// Loads elements and lays out on the pallet
///

import React from 'react'

import datasource from '../../../../control/common/datasource'

export default class PalletView extends React.Component {

  constructor(props) {
    super(props);
  }

  map_element(project, element) {
    const {Element} = require('../../element/' + element.type )

    // find data source
    const source = datasource.get( project.sources, element.datasource_id )

    return (
      <Element
        project={project}
        element={element}
        datasource={source} />
    )
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

            {this.map_element(this.props.project, element)}

          </div>
          )
        }
      )
    }

    return (
      <div>
        {elements}
      </div>
    )
  }


}
