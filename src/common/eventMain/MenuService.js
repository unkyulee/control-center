const {ipcRenderer} = require('electron')

import { event, NodeEvents, ProjectEvents } from '../event.js'

class MenuService {
	constructor() {
		// listen to events from the menu
		ipcRenderer.on('menu.save', (event, data) => { this.onSave(data) })
		ipcRenderer.on('menu.open', (event, data) => { this.onOpen(data) })
		ipcRenderer.on('menu.new_node', (event, data) => { this.onNewNode(data) })
	}

	onSave(filepath) {
		// run action
		event.emit(ProjectEvents.SAVE, filepath)
	}

	onOpen(data) {
		event.emit(ProjectEvents.LOAD, data)
	}

	onNewNode(data) {
		event.emit(NodeEvents.NEW_NODE, data)
	}
}

export default MenuService
