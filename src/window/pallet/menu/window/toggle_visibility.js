///
/// Toggle Window Visibility
///

const main = require('../../../../main.js')

module.exports.command = function(windowName) {

  try {
    // toggle visibility
    if( main.windowManager[windowName].isVisible() ) {
      main.windowManager[windowName].hide()
    } else {
      main.windowManager[windowName].show()
    }
  } catch(e) {
    // if the object is destroyed then create again
    const window = require('../../../'+windowName+'/create.js')
    main.windowManager[windowName] = window.create()
    main.windowManager[windowName].show()
  }

}
