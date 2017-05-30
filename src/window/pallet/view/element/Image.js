import React from 'react'

exports.render = function(project, element) {
  try {
    const parameter = JSON.parse(element.parameter)

    // if source starts with . then replace with file://[project_path]
    if( parameter.src.startsWith(".") ) {
      parameter.src.replace(".", "file:///"+project.filepath)
    }

    return <img src={parameter.src} />
  } catch(e) {
    return <div>{String(e)}</div>
  }

}
