import React, { Component, Fragment } from "react";
import Input from "./../Input/Input";
import Operator from "./../Operator/Operator";
import Button from "./../Button/Button";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0
    };
  }

  handleClick() {
    const firstLabel = parseInt(this.firstLabel.valueLabel.value);
    const secondLabel = parseInt(this.secondLabel.valueLabel.value);

    this.setState({
      result: eval(
        `${firstLabel} ${this.operator.valueSelect.value} ${secondLabel}`
      )
    });
  }

  render() {
    return (
      <Fragment>
        <Input
          ref={label => {
            this.firstLabel = label;
          }}
        />
        <Operator
          ref={op => {
            this.operator = op;
          }}
        />
        <Input
          ref={label => {
            this.secondLabel = label;
          }}
        />
        <Button onClickResult={() => this.handleClick()} />
        {this.state.result}
      </Fragment>
    );
  }
}

export default Calculator;
