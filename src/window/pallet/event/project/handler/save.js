// Listen for main message
import {ipcRenderer} from 'electron'

///
/// project.save sends project content in JSON format
///
ipcRenderer.on('project.save', (event, args) => {
  console.log('project save message received')
  console.log(args)
});
