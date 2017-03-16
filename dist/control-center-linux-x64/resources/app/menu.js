// https://github.com/electron/electron/blob/master/docs/api/menu.md
const electron = require('electron')
const app = electron.app
const fs = require('fs')

const { Menu } = require('electron')
const dialog = require('electron').dialog
const {ipcMain} = require('electron')

const FileService = require('./js/service/FileService.js')

// Save Project
ipcMain.on('file.save', (event, arg) => {
  // arg is json object containing project information
  fs.writeFileSync(arg.filepath, JSON.stringify(arg, null, 2) , 'utf-8');

  // save last opened file
  FileService.setLastOpenFile(arg.filepath)
})

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click (item, focusedWindow) {
          // File Open Dialog
          // https://github.com/electron/electron/blob/master/docs/api/dialog.md
          files = dialog.showOpenDialog(
            focusedWindow,
            {
              title: "Open Project",
              properties: ['openFile', 'singleSelections']
            }
          );
          if ( focusedWindow && files != null ) {
        		fs.readFile(files[0], 'utf8', function (err,data) {
        		  if (err) {
        		    return console.log(err);
        		  }
        			// send event
              focusedWindow.webContents.send('menu.open', data)

              // save last opened file
              FileService.setLastOpenFile(files[0])
        		});
          }
        }
      },
      {
        label: 'Save',
        click (item, focusedWindow) {
          // get last open file
          var lastProject = FileService.getLastOpenFilepath()

          // File Save Dialog
          filepath = dialog.showSaveDialog(
            focusedWindow,
            {
              title: "Save Project",
              properties: ['saveFile'],
              defaultPath: lastProject
            }
          );
          if (focusedWindow && filepath != null) {
            focusedWindow.webContents.send('menu.save', filepath)
          }
        }
      },
      {
        type: 'separator',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: 'Diagram',
    submenu: [
      {
        label: 'New Node',
        click (item, focusedWindow) {
          if (focusedWindow ) {
            focusedWindow.webContents.send('menu.new_node')
          }
        }
      }
    ]
  }
]



const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
