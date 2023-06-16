import React from "react";
import PropTypes from "prop-types";

import "./button.css";

const Button = ({label, onClick, disabled, className}) => {
    return <button type={"button"} disabled={disabled} onClick={onClick} className={`button ${className}`}>{label}</button>
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

Button.defaultProps = {
    className: "",
    disabled: false,
};

export default Button;