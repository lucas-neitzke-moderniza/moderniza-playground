/* eslint-disable no-unused-vars */
// *React
import React from 'react'
import PropTypes from "prop-types"

// *View
import View from './view'

// *Models
import { DataviewOptions } from './model'

/**
 * Dataview component
 * 
 * @param {Object|DataviewOptions} props.options options of component
 * @returns {JSX.Element}
 */
const Dataview = (props) => {
    return (
        <div>
            <View options={props.options} />
        </div>
    )
}

Dataview.propTypes = {
    /**
     * Options of component
     */
    options: PropTypes.oneOfType([
        PropTypes.instanceOf(DataviewOptions),
        PropTypes.object
    ]).isRequired
}

export default Dataview