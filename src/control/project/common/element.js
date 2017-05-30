/// Get list of elements

const fs = require('fs')

exports.list = function() {
  var types = []

  const files = fs.readdirSync("./window/pallet/view/element/")
  if(files) {
    files.forEach(file => {

      if ( file ) {
        types.push(file.replace('.js', ''))
      }

    })
  }

  return types
}
