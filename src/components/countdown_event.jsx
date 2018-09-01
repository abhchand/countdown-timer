import PropTypes from 'prop-types';
import React from 'react';

class CountdownEvent extends React.Component {
  // Error in setting propTypes?
  // See: https://github.com/babel/babel-eslint/issues/312#issuecomment-317688758
  // static propTypes = {
  //   id: PropTypes.number.isRequired,
  //   event: PropTypes.object.isRequired
  // }

  constructor(props) {
    super(props);

    this.timeRemaining = this.timeRemaining.bind(this);
    this.fontSize = this.fontSize.bind(this);
  }

  timeRemaining() {
    let secs = this.props.event.secsUntil;
    let remainder;

    let days = Math.floor(secs / (24 * 60 * 60));
    remainder = secs % (24 * 60 * 60);

    let hours = Math.floor(remainder / (60 * 60));
    remainder = remainder % (60 * 60);

    let minutes = Math.floor(remainder / 60);
    remainder = remainder % 60;

    let seconds = remainder;

    return (
      <span className="event-timer">
        <span className="remaining-days">{days}</span> days&nbsp;
        <span className="remaining-hours">{hours}</span> h&nbsp;
        <span className="remaining-minutes">{minutes}</span> m&nbsp;
        <span className="remaining-seconds">{seconds}</span> s
      </span>
    );
  }

  displayDate() {
    let currentTime = new Date().getTime();
    let eventDate = new Date(currentTime + (1000 * this.props.event.secsUntil));

    return eventDate.toDateString();
  }

  fontSize() {
    let fontSize = 50 - (15 * this.props.id);

    if (fontSize < 16) { fontSize = 16; }

    return fontSize;
  }

  render() {
    return (
      <div
        id={"event-" + this.props.event.id}
        className="countdown-event"
        style={ {fontSize: this.fontSize() + 'px'} }>

      <span>{this.timeRemaining()}</span> until&nbsp;
      <span className="event-name">{this.props.event.name}</span>
      <br />
      <span className="event-date">({this.displayDate()})</span>
      </div>
    );
  }
}

export default CountdownEvent;
