import React from "react";
import PropTypes from "prop-types";
import Button from "../button/button";

import "./button-group.css";

const ButtonGroup = ({items, onClick, className}) => {

    const buttons = items.map(item => (<Button key={item.id} onClick={() => onClick(item.value)} label={item.label} />))

    return <div className={`button-group ${className}`}>
        {buttons}
    </div>
}

ButtonGroup.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

ButtonGroup.defaultProps = {
    className: "",
};

export default ButtonGroup;