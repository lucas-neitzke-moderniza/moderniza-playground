import React from 'react'
import { InputText } from "primereact/inputtext"

/**
 * Dataview header search bar
 * 
 * @param {Boolean} loading 
 * @param {String} globalFilterValue 
 * @param {Function} onGlobalFilterChange 
 * 
 * @returns {JSX.Element}
 */
const searchBar = (loading, globalFilterValue, onGlobalFilterChange) => {
  return /*#__PURE__*/React.createElement("span", {
    className: "p-input-icon-left",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "pi pi-search"
  }), /*#__PURE__*/React.createElement(InputText, {
    disabled: loading,
    value: globalFilterValue,
    onChange: onGlobalFilterChange,
    placeholder: "Pesquise por qualquer campo...",
    style: {
      width: '100%'
    }
  }))
}
export default searchBar