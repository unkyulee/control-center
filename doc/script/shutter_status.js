const request = require('request')

// run http://localhost:8081/api/shutter/status to get the status
function tick() {
  // avoid running duplicate timers
  if( tick.run_id != context.source.run_id ) {
    console.log("removing timer handler " + context.source.run_id + " " + tick.run_id)
    return
  }

  console.log( 'tick ' + tick.run_id + " " + context.source.run_id )
  let url = "http://localhost:8081/api/shutter/status"
  request(url, function(err, resp, body) {
    let response = {}
    try { response = JSON.parse(body) } catch(err) {}

    if ( response.status == "ok" ) {
      // update shutter data
      shutters = context.source.data
      shutters.forEach( (target) => {
        response.shutter.forEach( (source) => {
          if( target.id == source.id ) {
            // update status of the shutter
            target.status = source.status
          }
        } )
      } )

      // send out the update to all windows
      context.projectManager.send('source.changed', context.source)

      // run next interval
      setTimeout( tick , 10000 )
    }

  })
}

// initiate the script
tick.run_id = context.source.run_id
tick()
