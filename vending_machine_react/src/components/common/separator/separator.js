import PropTypes from "prop-types";

import "./separator.css";

const Separator = ({type}) => {
    return <div className={`separator ${type}`}></div>
}

Separator.propTypes = {
    type: PropTypes.string
}

Separator.defaultProps = {
    type: "horizontal"
}

export default Separator;