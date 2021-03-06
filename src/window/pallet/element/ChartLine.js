import { ipcRenderer } from 'electron'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
const run = require('../../../control/common/run')

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  click = () => {
    // run onclick script if exists
    if( this.props.element.parameter.onClick ) {
      let script = this.props.parent.scripts[this.props.element.parameter.onClick]
      ipcRenderer.send("script.run", {
        script_id: script.id,
        element: this.props.element,
        source: this.props.source})
    }

    // sends out a message that a button is clicked
    ipcRenderer.send("element.clicked", this.props.element)
  }

  defaultFilterFunc = (type, element, arg) => { return arg  }

  render() {

    try {
      // get preRenderFilter
      let filterFunc = this.defaultFilterFunc
      if ( this.props.element.parameter && this.props.element.parameter.preRenderFilter ) {
        let script = this.props.parent.scripts[this.props.element.parameter.preRenderFilter]
        // run script
        let context = { filterFunc: null }
        run.run(script.script, context)
        // update filter func
        if( context.filterFunc ) filterFunc = context.filterFunc
      }

      let line_components = []
      // loop for each line def
      let lines = []
      if( this.props.element.parameter.lines )
        lines = this.props.element.parameter.lines
      lines.forEach( (l, i) => {
        line_components.push(
          <Line
            key={i}
            isAnimationActive={false}
            dataKey={l.dataKey}
            stroke={l.stroke}
          />
        )
      })

      let lineCharts = (
        <LineChart
            margin={this.props.element.parameter.margin}
            width={parseInt(this.props.element.parameter.width)}
            height={parseInt(this.props.element.parameter.height)}
            data={this.props.source.data}>
         <XAxis dataKey={this.props.element.parameter.xAxisKey} />
         <YAxis dataKey={this.props.element.parameter.yAxisKey} />
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         {line_components}
       </LineChart>
     )

    return (
        <div>
          <p onClick={this.click}
            style={this.props.element.parameter.headerStyle}>
            {this.props.element.parameter.header}
          </p>
          {lineCharts}
      </div>
      )

    } catch(err) {
      return (
        <div onClick={this.click}>
          {this.props.element.id} - {err.message} - {err.stack}
        </div>
      )
    }
  }

}
