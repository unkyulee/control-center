import React from 'react'

export class Element extends React.Component {
  constructor(props) {
		super(props)
	}

  render() {
    return <div>{this.props.element.parameter}</div>
  }

}
