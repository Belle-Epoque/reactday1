import React, { Component, Fragment } from "react";

class Operator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <select
          ref={select => {
            this.valueSelect = select;
          }}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
        </select>
      </Fragment>
    );
  }
}

export default Operator;
