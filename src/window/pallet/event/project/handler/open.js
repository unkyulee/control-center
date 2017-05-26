// Listen for main message
import {ipcRenderer} from 'electron'

///
/// project.save sends project content in JSON format
///
ipcRenderer.on('project.open', (event, filepath) => {
  console.log('project open message received')
  console.log(filepath)
});
