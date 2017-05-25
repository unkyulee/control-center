import React from 'react'
import { DropTarget } from 'react-dnd'

import { ItemTypes } from '../../../common/const.js'
import { event, NodeEvents } from '../../../common/eventWindow/event.js'
import NodeContext from '../element/NodeContext.js'

//
class Content extends React.Component {
  constructor(props) {
    super(props);

    // For our initial state, we just want
    this.state = {
      project: null
    }

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onLoad = this.onLoad.bind(this);
  }



  // On Project Load
  onLoad(data) {
    // load project
    this.setState({
			project: data
		});
  }



  render() {
    // react-dnd support
    const { connectDropTarget, isOver } = this.props;

    // No project loaded yet
    if ( this.state.project == null )
      return <p />

    // Load Projects
    const Nodes = this.state.project.nodes.map((a, i) =>
      <NodeContext
        key={a.id}
        property={a} />
    )

    // render nodes
    return connectDropTarget(
      <div style={{ height: '100%' }}>
        {Nodes}
      </div>
    );
  }

  // react component is rendering
  componentWillMount() {
    event.on(NodeEvents.LOAD, this.onLoad);

  }

  // react component is removed
  componentWillUnmount() {
    event.removeListener(NodeEvents.LOAD, this.onLoad);
  }

}

/* Drag and Drop Support */
const contentTarget = {
  drop(props, monitor) {
    // calculate the distance has it moved
    var source = monitor.getInitialSourceClientOffset();
    var dropped = monitor.getSourceClientOffset();

    // update the dropeed node position
    var property = monitor.getItem();
    property.top = property.top + dropped.y - source.y;
    property.left = property.left + dropped.x - source.x;
    event.emit(NodeEvents.MOVED, property);
  }
}

// inject drag and drop features to Content
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

// export module
export default DropTarget(ItemTypes.NODE, contentTarget, collect)(Content);
