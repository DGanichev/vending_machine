import React from "react";
import PropTypes from "prop-types";

import "./vending-machine-product.css";

const VendingMachineProduct = ({name, price, quantity, imageSrc, className}) => {
    return <div className={`product ${className}`}>
        <img className={"image"} src={imageSrc}/>
        <div className={"name"}>{name}</div>
        {quantity !== undefined && <div>Quantity: {quantity}</div>}
        {price !== undefined && <div className={"price"}>Price: {`${price}€`}</div>}
    </div>;
}

VendingMachineProduct.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imageSrc: PropTypes.string.isRequired,
    className: PropTypes.string
}

VendingMachineProduct.defaultProps = {
    className: ""
}

export default VendingMachineProduct;