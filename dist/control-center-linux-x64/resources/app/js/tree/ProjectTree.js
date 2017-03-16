import React from 'react'
import cx from 'classnames'

// https://github.com/pqx/react-ui-tree
import Tree from 'react-ui-tree'
import { ipcRenderer } from 'electron'

// https://github.com/vkbansal/react-contextmenu
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

import { event, NodeEvents, ProjectEvents } from '../event.js'

import NameProjectDlg from './NameProjectDlg.js'

class ProjectTree extends React.Component {
  constructor(props) {
    super(props);

    // For our initial state, we just want
    this.state = {
      active: null,
      tree: {},
      projects: null
    }

    //
    this.onClickNode = this.onClickNode.bind(this)
    this.renderNode = this.renderNode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderNode = this.renderNode.bind(this)

    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)

    this.onRename = this.onRename.bind(this)
    this.onRenamed = this.onRenamed.bind(this)

    this.onNew = this.onNew.bind(this)
    this.onCreated = this.onCreated.bind(this)

    this.onDelete = this.onDelete.bind(this)

    this.deleteTreeNode = this.deleteTreeNode.bind(this)
  }

  // On Project save
  onSave(filepath) {
    // save project
    const data = {
      filepath: filepath,
      tree: this.state.tree,
      projects: this.state.projects
    }
    ipcRenderer.send('file.save', data)
  }

  deleteTreeNode(tree, node) {
    if ( tree === node )
      return true

    //
    if ( tree.children != null )
      for( var i in tree.children ) {
        if( this.deleteTreeNode(tree.children[i], node) == true ) {
          tree.children.splice(i, 1);
          return true
        }
      }

    return false
  }

  onDelete() {
    if( confirm("Are you sure to delete the project?\n"+this.state.active.module) ) {
      // remove project
      delete this.state.projects[this.state.active.module]

      // remove from the tree node
      this.deleteTreeNode(this.state.tree, this.state.active)

      this.setState({
        active: null,
        tree: this.state.tree,
        projects: this.state.projects
      });
    }
  }


  onNew() {
    event.emit(ProjectEvents.NEW)
  }

  onCreated(data) {
    // create a new tree node
    if ( this.state.active.children == null )
    {
      this.state.active.children = []
      this.state.active.leaf = false
    }
    this.state.active.children.push({
      module: data
    })

    this.setState({
      active: this.state.active,
      tree: this.state.tree
    });

  }

  onRename() {
    event.emit(ProjectEvents.RENAME, this.state.active)
  }

  onRenamed(data) {
    // copy project to updated project
    this.state.projects[data] = this.state.projects[this.state.active.module]

    // remove previous project
    delete this.state.projects[this.state.active.module]

    // update the name of the tree
    this.state.active.module = data

    this.setState({
      active: this.state.active,
      tree: this.state.tree,
      projects: this.state.projects
    });
  }


  onLoad(data) {
    data = JSON.parse(data)
    this.setState({
      tree: data.tree,
      projects: data.projects,
    });
  }

  onClickNode(node) {
    // set clicked node to active
    this.setState({
      active: node
    });

    // send out message so the diagram loads up
    event.emit(NodeEvents.LOAD,
      this.state.projects[node.module]
    )
  }

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  }

  renderNode(node) {
    return (
      <span className={cx('node', {'is-active': node === this.state.active})}
        onClick={this.onClickNode.bind(null, node)}
        onContextMenu={this.onClickNode.bind(null, node)} >
        {node.module}
      </span>
    );
  }

  render() {
    return (
        <div className="tree">
          <ContextMenuTrigger
            id="ProjectTree"
            holdToDisplay={-1}>

            {/* Tree Object Here */}
            <Tree
              paddingLeft={20}
              tree={this.state.tree}
              onChange={this.handleChange}
              isNodeCollapsed={this.isNodeCollapsed}
              renderNode={this.renderNode} />
          </ContextMenuTrigger>

          {/* Context Menu Items */}
          <ContextMenu id="ProjectTree">
            <MenuItem
              data={this.state.property}
              onClick={this.onNew} >
              New
            </MenuItem>
            <MenuItem
              data={this.state.property}
              onClick={this.onRename} >
              Rename
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              data={this.state.property}
              onClick={this.onDelete} >
              Delete
            </MenuItem>
          </ContextMenu>
          <NameProjectDlg />
        </div>
      );
  }


  // react component is rendering
  componentWillMount() {
    event.on(ProjectEvents.LOAD, this.onLoad);
    event.on(ProjectEvents.SAVE, this.onSave);
    event.on(ProjectEvents.RENAMED, this.onRenamed);
    event.on(ProjectEvents.CREATED, this.onCreated);
  }

  // react component is removed
  componentWillUnmount() {
    event.removeListener(ProjectEvents.LOAD, this.onLoad);
    event.removeListener(ProjectEvents.SAVE, this.onSave);
    event.removeListener(ProjectEvents.RENAMED, this.onRenamed);
    event.removeListener(ProjectEvents.CREATED, this.onCreated);
  }

}

// export module
export default ProjectTree
