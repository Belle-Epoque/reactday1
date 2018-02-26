import React, { Component } from "react";

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      right: 0,
      operator: null,
      res: null
    };

    this.refLeft = null;
    this.refOperator = null;
    this.refRight = null;
  }

  onChangeCalc(e) {
    // Get value from current event.
    //const { target: { value = null } } = e;
    //console.log("DEBUG e.target.value", value);

    const radixDecimal = 10; // fix eslint error.

    // Get value from refs.
    const leftValue = parseInt(this.refLeft.value, radixDecimal);
    const rightValue = parseInt(this.refRight.value, radixDecimal);

    // Get current state.
    const { left, right, operator } = this.state;

    // Prepare new state.
    const prepareOperation = {
      left:
        this.refLeft.value && Number.isInteger(leftValue) ? leftValue : left,
      right:
        this.refRight.value && Number.isInteger(rightValue)
          ? rightValue
          : right,
      operator: this.refOperator.value ? this.refOperator.value : operator
    };

    this.buildRes(prepareOperation);
  }

  buildRes(prepareOperation) {
    const { left, right, operator } = prepareOperation;

    let res = null;
    switch (operator) {
      case "minus":
        res = left - right;
        break;
      case "plus":
        res = left + right;
        break;
      default:
    }

    this.setState({
      ...prepareOperation,
      res
    });
  }

  render() {
    const { res } = this.state;
    return (
      <div>
        <input
          type="text"
          name="left"
          ref={input => {
            this.refLeft = input;
          }}
          onChange={e => this.onChangeCalc(e)}
        />
        <select
          name="operator"
          ref={select => {
            this.refOperator = select;
          }}
          onChange={e => this.onChangeCalc(e)}
        >
          <option value="plus">+</option>
          <option value="minus">-</option>
        </select>
        <input
          type="text"
          name="right"
          ref={input => {
            this.refRight = input;
          }}
          onChange={e => this.onChangeCalc(e)}
        />
        <p>= {res}</p>
      </div>
    );
  }
}

export default Calc;
