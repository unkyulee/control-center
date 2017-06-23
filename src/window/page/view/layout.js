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
export default class PageMainLayout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			filter: "",
			pages: {},
			elements: {},
			selected: null
		}

	}

	onSearch = (keyword) => {
		this.setState({ filter: keyword })
	}

	onSelect = (page) => {
		this.setState({selected: page})
	}

	onChange = (id, value) => {
		// update the value
		this.state.selected[id] = value
		this.setState({selected: this.state.selected})
		// send project changed message
		ipcRenderer.send('page.changed', this.state.selected)
	}


	// called when the component is loaded
  componentWillMount() {
    ///
    /// Handle project.open event
    ///
    ipcRenderer.on('project.open', (event, projectData) => {

			// remain selected item
			let selected = null
			if( this.state.selected != null && this.state.selected.id in projectData.pages ) {
				selected = projectData.pages[this.state.selected.id]
			}

      this.setState({
				pages: projectData.pages,
				elements: projectData.elements,
				selected: selected
			})
    })

		///
		/// Handle elements.changed
		///
		ipcRenderer.on('elements.changed', (event, elements) => {
			this.setState({ elements: elements })
		})


		///
		/// Handle element.changed
		///
		ipcRenderer.on('element.changed', (event, element) => {
			this.state.elements[element.id] = element
			this.setState({ elements: this.state.elements })
		})



    ///
    /// Handle pages.changed
    ///
    ipcRenderer.on('pages.changed', (event, pages) => {
			this.setState({ pages: pages })
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
								<div style={{"height":"400px", "overflowY":"auto"}}>
									<ListView
										filter={this.state.filter}
										pages={this.state.pages}
										selected={this.state.selected}
										onSelect={this.onSelect} />
								</div>
							</Col>
						</Row>
					</Col>

					<Col xs={8}>

						<DetailView
						 	selected={this.state.selected}
							elements={this.state.elements}
							onChange={this.onChange} />
					</Col>

				</Row>
			</Grid>
    );
  }



}
