import React from "react";
import PropTypes from "prop-types";

import "./vending-machine-display.css";

const VendingMachineDisplay = ({message}) => {
    return <input readOnly={true} type={"text"} value={message}></input>
}

VendingMachineDisplay.propTypes = {
    message: PropTypes.string.isRequired,
};

export default VendingMachineDisplay;