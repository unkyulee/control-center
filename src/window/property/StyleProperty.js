import React from 'react';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';

import {event, NodeEvents} from '../../common/eventWindow/event.js';

export default class StyleProperty extends React.Component {
	constructor(props) {
    super(props);
    // For our initial state, we just want
    this.state = {
			property: this.props.property
		}

		// We need to bind this to onChange so we can have
    // the proper this reference inside the method
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		this.state.property[e.target.name] = e.target.value
    this.setState({
			property: this.state.property
		});
		// emit message of property changed
		event.emit(NodeEvents.PROPERTY_CHANGED, this.state.property);
  }

  render() {
    return (
			<form>
				<p className="bg-danger">&nbsp; <b>General</b></p>
				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>width</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="width"
							value={this.state.property.width}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>height</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="height"
							value={this.state.property.height}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>left</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="left"
							value={this.state.property.left}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>top</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="top"
							value={this.state.property.top}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>border style</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="border_style"
							value={this.state.property.border_style}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>border width</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="border_width"
							value={this.state.property.border_width}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>border color</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="border_color"
							value={this.state.property.border_color}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<br />
				<p className="bg-danger">&nbsp; <b>Title Style</b></p>
				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Font size</Button>
		        </InputGroup.Button>
		        <FormControl
							type="text" name="title_font_size"
							value={this.state.property.title_font_size}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Font color</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="title_font_color"
							value={this.state.property.title_font_color}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Background Color</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="title_bg_color"
							value={this.state.property.title_bg_color}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>Align</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="title_align"
							value={this.state.property.title_align}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<br />
				<p className="bg-danger">&nbsp; <b>Description Style</b></p>
				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Font size</Button>
		        </InputGroup.Button>
		        <FormControl
							type="text" name="description_font_size"
							value={this.state.property.description_font_size}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Font color</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="description_font_color"
							value={this.state.property.description_font_color}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>Background Color</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="description_bg_color"
							value={this.state.property.description_bg_color}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
					<InputGroup>
						<InputGroup.Button>
							<Button>Align</Button>
						</InputGroup.Button>
						<FormControl
							type="text" name="description_align"
							value={this.state.property.description_align}
							onChange={this.handleChange} />
					</InputGroup>
				</FormGroup>

				<br />
				<p className="bg-danger">&nbsp; <b>Icon Style</b></p>
				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>width</Button>
		        </InputGroup.Button>
		        <FormControl
							type="text" name="icon_width"
							value={this.state.property.icon_width}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

				<FormGroup>
		      <InputGroup>
		        <InputGroup.Button>
		          <Button>height</Button>
		        </InputGroup.Button>
						<FormControl
							type="text" name="icon_height"
							value={this.state.property.icon_height}
							onChange={this.handleChange} />
		      </InputGroup>
		    </FormGroup>

			</form>
    );
  }

	// react component is rendering
	componentWillMount() {	}

	// react component is removed
	componentWillUnmount() {	}
}
