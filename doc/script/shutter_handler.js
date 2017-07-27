/*
context = {
arg, projectManager
}
*/
//
// MFC OnClickHandler
// open a dialog
//
const dialogId = "e04f2f3a-2726-4adc-9e8b-b4af808854d7"
const pumpDataId = "0e97751e-530e-4ed2-989d-1be2fd7db114"

// update dialog property before showing
let element = context.arg.element
let dialogElement = context.projectManager.elements()[dialogId]
dialogElement.parameter.header = element.parameter.header
context.projectManager.send("element.changed", dialogElement)

// reset pump data
let source = context.projectManager.sources()[pumpDataId]
source.data[0]['type'] = element.parameter.type
source.data[0]['id'] = element.parameter.id
source.data[0]['on'] = null
context.projectManager.send("source.changed", source)

context.projectManager.send("dialog.show", {
  show: true,
  id: dialogId,
  element: context.arg.element
})
