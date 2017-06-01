const path = require('path')
const { ipcRenderer } = require('electron')

exports.run = function(script, context) {
  var ret = null;

  if( script ) {
    try {
      ret = function() { return eval(script); }.call({
  			context: context,
        ipcRenderer: ipcRenderer,
        $: $
  		});
    } catch(e) {
      console.log(e)
    }
  }

  return ret;
}
