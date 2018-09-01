import React from 'react';
import ReactDOM from 'react-dom';

import CountdownEvent from './countdown_event.jsx';
import CountdownEventError from './countdown_event_error.jsx';

class CountdownTimer extends React.Component {
  constructor() {
    super();

    // Example structure for `events`.
    // `secUntil` is set below and is only shown here for clarity
    //
    // [
    //   { secsUntil: null, month: 9,  date: 24, name: "Anniversary" },
    //   { secsUntil: null, month: 4,  date: 12, name: "Bday" },
    //   ...
    // ]
    let events;

    try {
      events = JSON.parse(process.env.COUNTDOWN_EVENTS)
    } catch (e) {
      this.state = {
        hasError: true
      };
      return;
    }

    let now = new Date();
    let currentMonth = now.getMonth() + 1;
    let currentDate = now.getDate();
    let currentYear = now.getFullYear();

    for (var i = 0; i < events.length; i++) {
      let eventMonth = events[i].month;
      let eventDate = events[i].date;
      let eventYear = currentYear;

      // If the event has already passed, use next year's event date
      let hasEventPassed = eventMonth < currentMonth ||
        (eventMonth == currentMonth && eventDate < currentDate);

      if (hasEventPassed) { eventYear += 1; }

      // Find out how long till the event
      let event = new Date(eventYear, eventMonth - 1, eventDate);
      events[i].secsUntil = Math.ceil((event - now) / 1000);
    }

    // Sort events by soonest event first
    events.sort(function(e1, e2) {
      if (e1.secsUntil < e2.secsUntil) {
        return -1;
      } else if (e1.secsUntil > e2.secsUntil) {
        return 1;
      } else {
        return 0;
      }
    });

    // Set State
    this.state = {
      hasError: false,
      events: events
    };

    // Bind functions
    this.countDown = this.countDown.bind(this);
    this.renderCountdownEvents = this.renderCountdownEvents.bind(this);

    // Start timer
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    let newEvents = this.state.events;

    for (var i = 0; i < newEvents.length; i++) {
      let newSecsUntil = newEvents[i].secsUntil - 1;
      if (newSecsUntil <= 0) { newSecsUntil = 0; }

      newEvents[i].secsUntil = newSecsUntil;
    }

    this.setState({
      events: newEvents
    });
  }

  renderCountdownEvents() {
    let events = this.state.events;

    return(
      <div>
        {
          events.map(function(event, i) {
            return <CountdownEvent key={`event-${i}`} id={i} event={events[i]} />
          })
        }
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return <CountdownEventError />;
    }

    return this.renderCountdownEvents();
  }
}

ReactDOM.render(<CountdownTimer/>, document.getElementById('app'));
