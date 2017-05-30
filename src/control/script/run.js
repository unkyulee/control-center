const path = require('path')

exports.run = function(context, script) {
  var ret = null;

  if( script ) {
    try {
      ret = function() { return eval(script); }.call({
  			context: context,
        $: $
  		});
    } catch(e) {
      console.log(e)
    }
  }

  return ret;
}
