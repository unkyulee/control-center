import React from 'react'
import { event, LogEvents } from '../event.js'


//
class ActivityView extends React.Component {
  constructor(props) {
    super(props);

    // For our initial state, we just want
    this.state = {
      logs: []
    }

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onLog = this.onLog.bind(this);
  }


  // display logs
  onLog(data) {
    this.state.logs.unshift(data)
    // if the log is bigger than 200 remove last
    if( this.state.logs.length > 200 )
      this.state.logs.pop()

    // load project
    this.setState({
			logs: this.state.logs
		});
  }


  render() {
    // Load Projects
    const logs = this.state.logs.map((a, i) =>
      <div key={i}>
        <span>{a}</span>
      </div>
    )

    // render nodes
    return (
      <div style={{backgroundColor: "white"}}>
        <p className="bg-primary">Activity Log</p>
        {logs}
      </div>
    )

  }

  // react component is rendering
  componentWillMount() {
    event.on(LogEvents.LOG, this.onLog)
  }

  // react component is removed
  componentWillUnmount() {
    event.removeListener(LogEvents.LOG, this.onLog)
  }

}

// export module
export default ActivityView
