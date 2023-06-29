/* eslint-disable no-unused-vars */
import React from 'react'
import { Paginator } from 'primereact/paginator'
import paginatorLeft from './components/paginatorLeft'
import paginatorRight from './components/paginatorRight'

/**
 * Dataview footer view
 * 
 * @param {Number} first 
 * @param {Number} rows 
 * @param {Number} totalRecords 
 * @param {Function} onPageChange 
 * @param {Number[]} peerPageOptions 
 * @param {Function} onChangePeerPageCallback 
 * 
 * @returns {JSX.Element}
 */
const footer = (first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback) => {
    return (
        <>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                rightContent={paginatorRight(rows, peerPageOptions, onChangePeerPageCallback)}
                leftContent={paginatorLeft(totalRecords)}
            />
        </>
    )
}

export {
    footer
}