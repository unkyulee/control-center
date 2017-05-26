
export default function map_element(element) {

  const e = require('../element/' + element.type )
  return e.render(element)
  
}
