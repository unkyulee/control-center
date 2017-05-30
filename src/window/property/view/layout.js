/******************************************************************************
 Main Layout of Property Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import SearchElementView from './search/view'
import ListElementView from './list/view'
import DetailElementView from './detail/view'

///
///
///
export default class PropertyMainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			filter: "",
			elements: [],
			types: [],
			selected: null
		}

	}

	onSearch = (keyword) => {
		this.setState({ filter: keyword })
	}

	onSelect = (element) => {
		this.setState({selected: element})
	}

	onChange = (id, value) => {
		this.state.selected[id] = value
		this.setState({selected: this.state.selected})
		// send project changed message
		ipcRenderer.send('elements.changed', this.state.elements)
	}

	render() {
    return (
			<Grid>

				<Row>

					<Col xs={4}>
						<Row>
							<Col xs={12}>
								<SearchElementView
									filter={this.state.filter}
									onSearch={this.onSearch} />
							</Col>
							<Col xs={12}>
								<ListElementView
									filter={this.state.filter}
									elements={this.state.elements}
									selected={this.state.selected}
									onSelect={this.onSelect} />
							</Col>
						</Row>
					</Col>

					<Col xs={8}>
						<DetailElementView
							types={this.state.types}
						 	selected={this.state.selected}
							onChange={this.onChange} />
					</Col>

				</Row>
			</Grid>
    );
  }

	// called when the component is loaded
  componentWillMount() {

    ///
    /// Handle project.open event
    ///
    ipcRenderer.on('project.open', (event, arg) => {

			// remain selected item
			let selected = null
			if( this.state.selected != null ) {
				arg.elements.forEach( (element) => {
					if( element.id == this.state.selected.id )
						selected = element
				})
			}

			if( selected == null && arg.elements.length > 0 ) {
				selected = arg.elements[0]
			}

      this.setState({
				elements: arg.elements,
				types: arg.types,
				selected: selected
			})
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
			alert(arg)
    })


  }

}
