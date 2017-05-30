
export default function map_element(project, element) {

  const e = require('../element/' + element.type )
  return e.render(project, element)

}
