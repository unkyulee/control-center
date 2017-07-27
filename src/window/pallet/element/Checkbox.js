import { ipcRenderer } from 'electron'
import React from 'react'
import { Checkbox } from 'react-bootstrap'
const run = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  click = () => {
    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  onChange = (e) => {
    let valueColumnName = "value"
    if( this.props.element.parameter.valueColumnName )
      valueColumnName = this.props.element.parameter.valueColumnName

    this.props.source.data[e.target.id][valueColumnName] = e.target.checked
    ipcRenderer.send('source.changed', this.props.source)
  }

  defaultFilterFunc = (type, element, arg) => { return arg  }

  render() {
    try {
      // get checkbox
      let checkboxes = []

      // find the data match
      if( this.props.source ) {
        let titleColumnName = "title"
        if( this.props.element.parameter.titleColumnName )
          titleColumnName = this.props.element.parameter.titleColumnName

        let valueColumnName = "value"
        if( this.props.element.parameter.valueColumnName )
          valueColumnName = this.props.element.parameter.valueColumnName

        let idColumnName = "id"
        if( this.props.element.parameter.idColumnName )
          idColumnName = this.props.element.parameter.idColumnName


        // make table body
        // loop for each row in data
        this.props.source.data.forEach( (row, row_number) => {
          checkboxes.push(
            <Checkbox
              key={row_number}
              id={row_number}
              checked={row[valueColumnName]}
              onChange={this.onChange}
              style={this.props.element.parameter.style}>
                {row[titleColumnName]}
            </Checkbox>)
        })
      }

      // get preRenderFilter
      let filterFunc = this.defaultFilterFunc
      if ( this.props.element.parameter.preRenderFilter ) {
        let script = this.props.parent.scripts[this.props.element.parameter.preRenderFilter]
        // run script
        let context = { filterFunc: null }
        run.run(script.script, context)
        // update filter func
        if( context.filterFunc ) filterFunc = context.filterFunc
      }

      return (
        <div onClick={this.click} style={{"width": "100%"}}>
          <p style={this.props.element.parameter.headerStyle}>
            {this.props.element.parameter.header}
          </p>
          {checkboxes}
        </div>
      )

    } catch(err) {
      return <div>{this.props.element.id} - {err.message} - {err.stack}</div>
    }
  }



}
