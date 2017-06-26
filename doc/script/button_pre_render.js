/*
context:
  filterFunc
*/

context.filterFunc = (type, element) {
  // change bsStyle depending on the text
  if( type == "bsStyle" ) {
    if( element.parameter.text == "open" )
      return "success"
    else if( element.parameter.text == "closed" )
      return "danger"
    else if( element.parameter.text == "opening" || element.parameter.text == "closing" )
      return "info"
  }
}
