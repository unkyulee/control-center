const path = require('path')
const { ipcRenderer } = require('electron')
const jquery = require('jquery')

exports.run = function(script, context) {
  var ret = null;

  if( script ) {
    ret = function() { return eval(script); }.call({
			context: context,
      ipcRenderer: ipcRenderer,
      $: jquery
		});
  }

  return ret;
}
