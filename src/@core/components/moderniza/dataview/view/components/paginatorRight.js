import React from 'react'
import { Dropdown } from "primereact/dropdown"

/**
 * Dataview footer paginator right
 * 
 * @param {Number} rows 
 * @param {Number[]} peerPageOptions 
 * @param {Function} onChangePeerPageCallback 
 * 
 * @returns {JSX.Element}
 */
const paginatorRight = (rows, peerPageOptions, onChangePeerPageCallback) => {
    return (
        <Dropdown value={rows} options={peerPageOptions} onChange={(e) => {
            onChangePeerPageCallback(e)
        }} />
    )
}

export default paginatorRight