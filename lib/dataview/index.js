/* eslint-disable no-unused-vars */
// *React
import React from 'react'
import PropTypes from "prop-types"

// *View
import View from './view'

// *Models
import { DataviewOptions } from './model'

// *STYLES
// import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

/**
 * Dataview component
 * 
 * @param {Object|DataviewOptions} props.options options of component
 * @returns {JSX.Element}
 */
const Dataview = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(View, {
    options: props.options
  }))
}
Dataview.propTypes = {
  // *Options of component
  options: PropTypes.oneOfType([PropTypes.instanceOf(DataviewOptions), PropTypes.object]).isRequired
}
export default Dataview