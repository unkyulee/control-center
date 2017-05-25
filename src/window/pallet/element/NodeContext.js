import React from 'react'

// https://github.com/vkbansal/react-contextmenu
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

import { event, NodeEvents } from '../../../common/eventWindow/event.js'
import Node from './Node.js'
import PropertyDlg from '../../property/PropertyDlg.js'

//
class NodeContext extends React.Component {
  constructor(props) {
    super(props);

    // For our initial state, we just want
    this.state = {
      property: props.property,
      isDragging: false
    }

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
  }

  render() {
    const ActionMenuItem = this.state.property.action.map((a, i) =>
      <MenuItem
        key={i}
        data={{
          property: this.state.property,
          action: this.state.property.action[i]
        }}
        name={this.state.property}
        onClick={
          function e(e, data) {
            event.emit(NodeEvents.RUN_ACTION, data)
          }} >
        {a.name}
      </MenuItem>
    )
    return (
      <div style={{ width: '0px', height: '0px' }}>
        {/* Context Menu Helper */}
        <ContextMenuTrigger
          id={this.state.property.id}
          holdToDisplay={-1}>

          {/* Node Object Here */}
          <Node property={this.state.property} />
        </ContextMenuTrigger>

        {/* Context Menu Items */}
        <ContextMenu id={this.state.property.id}>
          {ActionMenuItem}
          <MenuItem divider />
          <MenuItem
            data={this.state.property}
            onClick={
              function e(e, data) {
                event.emit(NodeEvents.SHOW_PROPERTY_DLG, data)
              }} >
            Property
          </MenuItem>
        </ContextMenu>

        {/* Property Dialog */}
        <PropertyDlg property={this.state.property} />
      </div>
    );
  }

  // react component is rendering
  componentWillMount() {
  }

  // react component is removed
  componentWillUnmount() {
  }

}

// export module
export default NodeContext
