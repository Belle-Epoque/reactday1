import React, { Component, Fragment } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <input
          ref={label => {
            this.valueLabel = label;
          }}
          type="text"
        />
      </Fragment>
    );
  }
}

export default Input;
