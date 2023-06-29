/* eslint-disable no-unused-vars */
import React from 'react'
import exportButton from './components/exportButton'
import layoutButton from './components/layoutButton'
import searchBar from './components/searchBar'
import sortButton from './components/sortButton'

/**
 * Dataview header view
 * 
 * @param {String} title 
 * @param {Boolean} loading 
 * @param {String} layout 
 * @param {Function} onChangeLayout 
 * @param {String} globalFilterValue 
 * @param {Function} onGlobalFilterChange 
 * @param {Object} optionsExport 
 * @param {Object} dataTableRefOrSorts 
 * @param {Object|String} exportOverPanelRefOrSortKey 
 * @param {Array|Function} resultsOrOnSortChange 
 * @param {Array} exportColumns 
 * 
 * @returns {JSX.Element}
 */
const header = (title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, optionsExport, dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, exportColumns) => {
    return (
        <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
            {
                title ? (
                    <div className="flex me-auto">
                        <h4 className="m-0">{title}</h4>
                    </div>
                ) : ''
            }
            {
                searchBar(loading, globalFilterValue, onGlobalFilterChange)
            }
            {
                // ?REFACTORY: options.export, valor padrao = false, caso undefined
                optionsExport !== false && layout === 'table' ? exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey) : ''
            }
            {
                layout !== 'table' ? sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange) : ''
            }
            {
                layout !== 'table' ? layoutButton(layout, onChangeLayout) : ''
            }
        </div>
    )
}

export {
    header
}