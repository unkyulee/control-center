import React from 'react'
import { DragSource } from 'react-dnd'
import { Table } from 'react-bootstrap'

import { ItemTypes } from '../../const.js'
import { event, NodeEvents } from '../../event.js'
import { isEmpty } from '../../lib.js'


class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      property: this.props.property
    }

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onNodeSelected = this.onNodeSelected.bind(this);
    this.onPropertyChanged = this.onPropertyChanged.bind(this);
  }

  runScript(action) {
    const data = {
      property: this.state.property,
      action: action
    }
    event.emit(NodeEvents.RUN_ACTION, data)
  }


  // when node is clicked - consider as selected
  onNodeSelected(e) {
    event.emit(NodeEvents.SELECTED, this.state.property);
  }

  onPropertyChanged(property) {
    // only handle when id is same
    if ( this.state.property.id != property.id )
      return;

    // change the property
    this.setState({
			property: property
		});
  }

  render() {
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    const icon = isEmpty(this.state.property.icon) ? null:
      <img
        src={this.state.property.icon}
        width={this.state.property.icon_width + 'px'}
        height={this.state.property.icon_height + 'px'}
        style={{marginRight: "5px"}}/>

    return connectDragSource(
      <div
        id={this.state.property.id}
        style={{
          top: this.state.property.top+'px',
          left: this.state.property.left+'px',
          width: this.state.property.width+'px',
          height: this.state.property.height+'px',
          backgroundColor: this.state.property.backgroundColor,
          opacity: isDragging ? 0.2 : 1,
          position: 'relative',
          borderStyle: this.state.property.border_style ? this.state.property.border_style : 'solid',
          borderWidth: this.state.property.border_width ? this.state.property.border_width+'px' : '2px',
          borderColor: this.state.property.border_color ? this.state.property.border_color : 'black',
        }}
        onClick={this.onNodeSelected}
      >
        <Table style={{borderStyle: "none", borderWidth: "0px"}}>
          <tbody>
            <tr style={{
              backgroundColor: this.state.property.title_bg_color
            }}>

              <td>

                {/* Node Title */}
                <p style={{
                  fontSize: this.state.property.title_font_size + 'px',
                  fontColor: this.state.property.title_font_color,
                  textAlign: this.state.property.title_align,
                  margin: "0px"
                }}>
                  {icon}
                  {this.state.property.title}
                </p>

              </td>
            </tr>
            {isEmpty(this.state.property.description) ? null:
            <tr style={{
              backgroundColor: this.state.property.description_bg_color
            }}>
              {/* Node Description */}
              <td>
                <font style={{
                  fontSize: this.state.property.description_font_size + 'px',
                  fontColor: this.state.property.description_font_color,
                  textAlign: this.state.property.description_align
                }}>
                {this.state.property.description}
                </font>
              </td>
            </tr>
            }
          </tbody>
        </Table>
      </div>
    );
  }


  // react component is rendering
  componentWillMount() {
    event.on(NodeEvents.PROPERTY_CHANGED, this.onPropertyChanged);

    // initialize action timers
    this.props.property.action.map( (a, i) => {
      if ( a.timer > 0 ) {
        a.timer_var = setInterval(this.runScript.bind(this, a) , a.timer * 1000);
      }
    })
  }

  // react component is removed
  componentWillUnmount() {
    event.removeListener(NodeEvents.PROPERTY_CHANGED, this.onPropertyChanged);

    // reset timers
    this.props.property.action.map( (a, i) => {
      if ( a.timer_var != undefined ) {
        clearInterval(a.timer_var)
      }
    })
  }

}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const nodeSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return props.property;
  },

  endDrag(props) {
    return props.property;
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

// convert Node to DragSource before exporting
export default DragSource(ItemTypes.NODE, nodeSource, collect)(Node);
