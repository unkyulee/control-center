const {ipcMain} = require('electron')


// Constructor
module.exports = function() {
  // private value
  var projectManager = null

  // public methods
  return {
    init: function(projectManager) {
      // save project Manager
      projectManager = projectManager


      ///
      /// Listen to Element Change (List)
      ///
      ipcMain.on('currPage.changed', (event, page_id) => {
        if( page_id && page_id != "" ) {
          let pages = projectManager.pages()
          if( page_id in pages )
            projectManager.currPage_update(pages[page_id])
        }

        else {
          projectManager.currPage_update(null)
        }
        
        // send out the update to all windows
        projectManager.send('currPage.changed', projectManager.currPage())
      })


      ///
      /// Listen to Element Change (List)
      ///
      ipcMain.on('pages.changed', (event, pages) => {
        // update the project project
        projectManager.pages_update(pages)
        // send out the update to all windows
        projectManager.send('pages.changed', projectManager.pages())
      })


      ///
      /// Listen to Element Change (Single)
      ///
      ipcMain.on('page.changed', (event, page) => {
        let pages = projectManager.pages()
        pages[page.id] = page
        projectManager.pages_update(pages)

        // send out the update to all windows
        projectManager.send('page.changed', page)
      })



      ///
      /// Listen to Page Clicked
      ///
      ipcMain.on('page.clicked', (event, page) => {
        projectManager.send('page.clicked', page)
      })




      ///
      /// Reload page script and css
      ///
      ipcMain.on('page.reload', (event, arg) => {
        // get current project file path
        filepath = recent.get()
        // open css file and assign
        style.update(filepath, arg)
        // open script file and assign
        script.update(filepath, arg)

        let pages = projectManager.pages()
        pages[page.id] = page
        projectManager.pages_update(pages)

        projectManager.send('page.changed', page)
      })






      ///
      /// Create Element
      ///
      ipcMain.on('page.new', (event, page) => {
        // create new ID
        if ( page == null ) page = {}
        page.id = String(require('uuid/v4')())
        page.name = "New Page"

        // update the project project
        let pages = projectManager.pages()
        pages[page.id] = page
        projectManager.pages_update(pages)

        // send out the update to all windows
        projectManager.send('pages.changed', pages)
        projectManager.send('page.clicked', page)
      })


      ///
      /// Delete Element
      ///
      ipcMain.on('page.delete', (event, page) => {
        // update the project project
        let pages = projectManager.pages()
        delete pages[page.id]
        projectManager.pages_update(pages)

        // send out the update to all windows
        projectManager.send('pages.changed', pages)
      })

    }

  } // return

}() // end
