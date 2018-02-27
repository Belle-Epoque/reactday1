import React, { Component } from "react";
import { PropTypes } from "prop-types";

/**
 * Tick
 *
 * Component with state and props
 *
 * @param {string} title component title
 *
 */
class Tick extends Component {
  constructor(props) {
    super(props);
    // Init state
    this.state = {
      counter: 100
    };

    // Declare timer.
    this.timer = null;
    // this.state undefined without bind.
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { interval = 1000 } = this.props;
    this.startTimer(interval);
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer(interval) {
    this.timer = setInterval(this.tick, interval);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  tick() {
    const { counter } = this.state;

    if (counter < 1) {
      // Stop timer.
      this.stopTimer();
      return;
    }

    this.setState(state => ({
      counter: state.counter - 1
    }));
  }

  renderCounter() {
    const { counter } = this.state;

    if (counter === 0) {
      return "finished";
    }

    return counter;
  }

  render() {
    const { counter } = this.state;
    console.log("DEBUG counter", counter);
    return <p>{this.renderCounter()}</p>;
  }
}

Tick.propTypes = {
  interval: PropTypes.number
};

export default Tick;
