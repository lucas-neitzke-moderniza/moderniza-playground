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
const footer = (first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback, optionsPagination, deviceSize) => {
    
    const getPageLinkSize = () => {
        if (deviceSize.width < 575.98) {
            return 1
        } else if (deviceSize.width > 575.98 && deviceSize.width < 767.98) { 
            return 3
        } else {
            return 5
        }
    }

    const getRightContent = () => {
        if (deviceSize.width < 575.98) {
            return <></>
        } else {
            return paginatorRight(rows, peerPageOptions, onChangePeerPageCallback)
        }
    }

    const getLeftContent = () => {
        if (deviceSize.width < 575.98) {
            return <></>
        } else {
            return paginatorLeft(totalRecords)
        }
    }
    
    return (
        optionsPagination?.visible ? (
            <Paginator
                pageLinkSize={getPageLinkSize()}
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                rightContent={getRightContent()}
                leftContent={getLeftContent()}
            />
        ) : <></>
    )
}

export {
    footer
}