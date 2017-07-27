let url = "http://thermoc:8081/api/gas_gauge/status"
let timing = 2000

const request = require('request')
var run_id = context.source.run_id

// run http://localhost:8081/api/gas_gauge/status to get the status
function tick() {
  // avoid running duplicate timers
  if( run_id != context.source.run_id ) {
    console.log("removing timer handler " + context.source.run_id + " " + run_id)
    return
  }
  request(url, function(err, resp, body) {
    let response = {}
    try { response = JSON.parse(body) } catch(err) {}

    if ( response.status == "ok" ) {
      // update shutter data
      context.source.data = response.gas_gauge
      // send out the update to all windows
      context.projectManager.send('source.changed', context.source)

      // run next interval
      setTimeout( tick , timing )
    }

  })
}

// initiate the script
tick()
