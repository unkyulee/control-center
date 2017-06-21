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
			pages: [],
			selected: null
		}

	}

	onSearch = (keyword) => {
		this.setState({ filter: keyword })
	}

	onSelect = (source) => {
		this.setState({selected: source})
	}

	onChange = (id, value) => {
		// update the value
		this.state.selected[id] = value
		this.setState({selected: this.state.selected})
		// send project changed message
		ipcRenderer.send('page.changed', this.state.sources)
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
			if( this.state.selected != null && this.state.selected.id in arg.sources ) {
				selected = arg.sources[this.state.selected.id]
			}

      this.setState({
				sources: arg.sources,
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