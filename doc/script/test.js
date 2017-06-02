// manupulate data
const request = require('request')

function updateShutterLog() {
  let url = "http://localhost:8081/api/shutter/log/5"
  // request module is used to process the yql url and return the results in JSON format
  request(url, function(err, resp, body) {
    let log = JSON.parse(body)
    context.project.sources[1].data = log
    update()
    console.log("update message sent")
  });
}

function update() {
  // send update message to all windows
  context.windowManager.forEach( (w) => {
    // don't send the update message to the sender to avoid loop
    w.webContents.send('project.open', context.project)
  })
}


setInterval(updateShutterLog, 1000)
