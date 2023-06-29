import React from 'react'

/**
 * Dataview footer paginator left
 * 
 * @param {Number} totalRecords 
 * 
 * @returns {JSX.Element}
 */
const paginatorLeft = (totalRecords) => {
    return (
        <div>{totalRecords} Resultados</div>
    )
}

export default paginatorLeft