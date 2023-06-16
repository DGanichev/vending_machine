import React from "react";
import PropTypes from "prop-types";

import "./label.css";

const Label = ({label, className}) => {
    return <div className={`label ${className}`}>{label}</div>;
}

Label.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};

Label.defaultProps = {
    className: "",
};

export default Label;