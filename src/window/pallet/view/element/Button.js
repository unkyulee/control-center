import React from 'react'
import { Button } from 'react-bootstrap'

// script runner
import {run} from '../../../../control/script/run'

exports.render = function(project, element) {
  try {
    const parameter = JSON.parse(element.parameter)

    return <Button bsStyle={parameter.bsStyle}>{parameter.value}</Button>
  } catch(e) {
    return <div>{String(e)}</div>
  }

}
