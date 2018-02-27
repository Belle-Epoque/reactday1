import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Button from "material-ui/RaisedButton";
import "./Counter.css";

// Component which doesn't need a state
export const CounterSimple = ({ title }) => (
  <div className="Counter">
    <h1>{title}</h1>
  </div>
);

/**
 * Counter
 *
 * Component with state and props
 *
 * @param {string} title component title
 *
 */
class Counter extends Component {
  constructor() {
    super();
    // Init state
    this.state = {
      clickCount: 0
    };
  }
  incrementClickCount() {
    this.setState(prevState => ({
      clickCount: prevState.clickCount + 1
    }));
  }
  render() {
    return (
      <div>
        <h1 className="Counter-title">{this.props.title}</h1>
        <div>
          <Button onClick={() => this.incrementClickCount()} primary={true}>
            Click Count: {this.state.clickCount}
          </Button>
        </div>
      </div>
    );
  }
}
Counter.propTypes = {
  title: PropTypes.string.isRequired
};

export default Counter;
