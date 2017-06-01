///
/// Get data source
///

exports.get = function(sources, datasource_id) {
  // find data
  let datasource = null
  sources.forEach( (source) => {
    if ( source.id == datasource_id ) {
      datasource = source
    }
  })

  return datasource
}


exports.index = function(sources, datasource_id) {
  // find data
  let index = -1
  sources.forEach( (source, i) => {
    if ( source.id == datasource_id ) {
      index = i
    }
  })

  return index
}
