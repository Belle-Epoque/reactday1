import React, { Component } from "react";
import { PropTypes } from "prop-types";
import moment from "moment";

/**
 * CountDown
 *
 * React version of https://codepen.io/ParsonsProjects/pen/mVbZgY.
 */
class CountDown extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      counter: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      diffTime: 0,
      duration: 0
    };

    // Declare timer.
    this.timer = null;
    // this.state undefined without bind.
    this.tick = this.tick.bind(this);
    // Get interval from props or from default defaultRefreshInterval.
    this.defaultRefreshInterval = 1000;
    this.getInterval = this.getInterval.bind(this, this.defaultRefreshInterval);
  }

  componentWillMount() {
    const { eventTime } = this.props;
    const diffTime = this.getDiffTime(eventTime);
    this.setState({
      diffTime,
      duration: moment.duration(diffTime * 1000, "milliseconds")
    });
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getDiffTime(eventTime) {
    const momentEventTime = moment(eventTime, "DD-MM-YYYY HH:mm:ss").unix();
    const momentCurrentTime = moment().unix();
    return momentEventTime - momentCurrentTime;
  }

  getInterval(defaultInterval) {
    const { interval = defaultInterval } = this.props;
    return interval;
  }

  startTimer() {
    this.timer = setInterval(this.tick, this.getInterval());
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  tick() {
    const { duration, diffTime } = this.state;

    if (diffTime <= 0) {
      this.stopTimer();
      return;
    }

    const { eventTime } = this.props;
    const newDuration = moment.duration(
      duration.asMilliseconds() - this.getInterval(),
      "milliseconds"
    );

    this.setState({
      counter: {
        year: moment.duration(newDuration).years(),
        month: moment.duration(newDuration).months(),
        day: moment.duration(newDuration).days(),
        hour: moment.duration(newDuration).hours(),
        minute: moment.duration(newDuration).minutes(),
        second: moment.duration(newDuration).seconds()
      },
      duration: newDuration,
      diffTime: this.getDiffTime(eventTime)
    });
  }

  renderUnit(unit, label) {
    if (unit <= 0) {
      return;
    }
    const plural = unit => (unit > 1 ? "s" : "");
    return (
      <li key={label}>
        {unit} {label}
        {plural(unit)}
      </li>
    );
  }

  renderMyCountDown() {
    const { counter, diffTime } = this.state;

    if (diffTime <= 0) {
      return <p>This event is finished</p>;
    }

    return (
      <div>
        <p>This event is in:</p>
        <ul>
          {Object.keys(counter).map(unit =>
            this.renderUnit(counter[unit], unit)
          )}
        </ul>
      </div>
    );
  }

  render() {
    return <div>{this.renderMyCountDown()}</div>;
  }
}

CountDown.propTypes = {
  interval: PropTypes.number,
  eventTime: (props, propName, componentName) => {
    const prop = props[propName];

    // Required event date.
    if (prop === null) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}.
        Validation failed. This prop is required`);
    }

    // Allowed examples: '1-12-2011 19:20' OR '01-12-2011 19:20'.
    if (
      !/^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$/.test(
        prop
      )
    ) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}.
        Validation failed (allowed examples: '1-12-2011 19:20' OR '01-12-2011 19:20'`);
    }
  }
};

export default CountDown;
