/******************************************************************************
 Main Layout of Property Window

splits screen into navigation and content

*******************************************************************************/

import React from 'react'
import { ipcRenderer } from 'electron'
import { Grid, Row, Col, Button } from 'react-bootstrap'

import ToolbarView from './toolbar/view'
import SearchView from './search/view'
import ListView from './list/view'
import DetailView from './detail/view'

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
		ipcRenderer.send('element.changed', this.state.selected)
	}

	render() {
    return (
			<Grid>
				<Row>
					<Col xs={12} className="toolbarview">
						<ToolbarView
							selected={this.state.selected} />
					</Col>

					<Col xs={4}>
						<Row>
							<Col xs={12}>
								<SearchView
									filter={this.state.filter}
									onSearch={this.onSearch} />
							</Col>

							<Col xs={12}>
								<div style={{"height":"500px", "overflowY":"auto"}}>
									<ListView
										filter={this.state.filter}
										elements={this.state.elements}
										selected={this.state.selected}
										onSelect={this.onSelect} />
								</div>
							</Col>
						</Row>
					</Col>

					<Col xs={8}>

						<DetailView
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
			if( this.state.selected && this.state.selected.id in arg.elements ) {
				selected = arg.elements[this.state.selected.id]
			}

			// set the item
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
