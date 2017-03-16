import React from 'react'
import { DropTarget } from 'react-dnd'
import uuidV4 from 'uuid/v4'

import { ItemTypes } from '../const.js'
import { event, NodeEvents } from '../event.js'
import { DefaultNode } from './node/DefaultNode.js'
import NodeContext from './node/NodeContext.js'

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
    this.onNewNode = this.onNewNode.bind(this);
  }

  // on new node
  onNewNode(data) {
    // create new node
    var newNode = JSON.parse(JSON.stringify(DefaultNode))
    // set random ID for the node
    newNode.id = uuidV4()

    if (this.state.project == null) {
      // if it's empty project
      this.setState({
        project: {
          nodes: [newNode]
        }
      })
    }
    else {
      // append new node
      this.state.project.nodes.push(newNode)
      this.setState({
        project: this.state.project
      })
    }
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
        key={i}
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
    event.on(NodeEvents.NEW_NODE, this.onNewNode);
  }

  // react component is removed
  componentWillUnmount() {
    event.removeListener(NodeEvents.LOAD, this.onLoad);
    event.removeListener(NodeEvents.NEW_NODE, this.onNewNode);
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
