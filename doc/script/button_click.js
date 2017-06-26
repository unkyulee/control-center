/*
context = {
arg, projectManager
}
*/
//
// Valve Toggle Button
// if the valve is open then send close valve
// else if the vale is closed then send open valve

const request = require('request')

// element
let element = context.arg.element
// see the text
let text = element.parameter.text
// see the id
let row_id = element.parameter.row_id
// see the type
let type = element.parameter.type

// api url
const open_url = 'http://localhost:8081/api/'+type+'/open/'+row_id
const close_url = 'http://localhost:8081/api/'+type+'/close/'+row_id

function updateText(text) {
  element.parameter.text = text
  context.projectManager.send('element.changed', element)
}

if ( text == "open" ) {
  updateText("closing")
  // close shutter
  request(close_url)
}

else if ( text == "closed" ) {
  updateText("opening")
  // open shutter
  request(open_url)
}
