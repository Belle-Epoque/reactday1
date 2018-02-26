import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const { text, onClickResult } = this.props;
    return (
      <Fragment>
        <button onClick={() => onClickResult()}>{text}</button>
      </Fragment>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClickResult: PropTypes.func.isRequired
};

Button.defaultProps = {
  text: "RESULTAT",
  onClickResult: () => {}
};

export default Button;
