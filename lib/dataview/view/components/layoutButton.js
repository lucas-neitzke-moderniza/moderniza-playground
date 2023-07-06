/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Button } from "primereact/button"

/**
 * Dataview header layout button 
 * 
 * @param {String} layout 
 * @param {Function} callback 
 * 
 * @returns {JSX.Element}
 */
const layoutButton = (layout, callback, deviceSize) => {
  const items = [
{
    icon: 'pi pi-th-large',
    value: 'grid'
  }, {
    icon: 'pi pi-bars',
    value: 'list'
  }, {
    icon: 'pi pi-table',
    value: 'table'
  }
]
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "p-buttonset"
  }, items.map((item, index) => {
    if (!(item.value === 'table' && deviceSize.width < 575.98)) {
      return /*#__PURE__*/React.createElement(Button, {
        key: index,
        size: "small",
        severity: "primary",
        icon: item.icon,
        outlined: item.value !== layout,
        onClick: () => callback(item.value)
      })
    }
  })))
}
export default layoutButton