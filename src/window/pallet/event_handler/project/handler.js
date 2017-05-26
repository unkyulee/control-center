///
/// Listens to events from Main process and handles
///

// Listen for main message
import {ipcRenderer} from 'electron'


///
/// project.open sends project content in JSON format
///
ipcRenderer.on('project.open', (event, project) => {
  console.log('project open message received')
  console.log(project)
});
