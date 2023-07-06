import React from 'react'

/**
 * Dataview footer paginator left
 * 
 * @param {Number} totalRecords 
 * 
 * @returns {JSX.Element}
 */
const paginatorLeft = totalRecords => {
  return /*#__PURE__*/React.createElement("div", null, totalRecords, " Resultados")
}
export default paginatorLeft