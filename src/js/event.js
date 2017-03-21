var EventEmitter = require('events').EventEmitter

// singletone event object
export const event = new EventEmitter();

event.setMaxListeners(512)

// Node Event Types
export const NodeEvents = {
  MOVED: 'node.moved',
  SELECTED: 'node.selected',
  PROPERTY_CHANGED: 'node.property.changed',
  SHOW_PROPERTY_DLG: 'node.property.show_dlg',
  RUN_ACTION: 'node.run_action',
  NEW_NODE: 'node.new_node',
  LOAD: 'node.load'
}


// Project Event
export const ProjectEvents = {
  LOAD: "project.load",
  SAVE: "project.save",
  RENAME: "project.rename",
  RENAMED: "project.renamed",
  NEW: "project.new",
  CREATED: "project.created",
  DELETE: "project.delete"
}
