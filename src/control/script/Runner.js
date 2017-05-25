import { event, NodeEvents, LogEvents } from '../event.js';

function evalInContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return function() { return eval(js); }.call(context);
}

class Runner {
	constructor() {
		// listen to run action event
		event.on(NodeEvents.RUN_ACTION, this.onRunAction);
	}

	onRunAction(data) {
    // produce log
    event.emit(LogEvents.LOG, data.property.title + " - " + data.action.name)

    // call the script
		var context = {
			property: data.property,
			event: event,
			NodeEvents: NodeEvents,
      jQuery: $
		};
		evalInContext(data.action.script, context)
	}
}

export default Runner
