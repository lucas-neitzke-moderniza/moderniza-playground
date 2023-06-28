/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'
import { Slider } from 'primereact/slider'
import { Tag } from 'primereact/tag'
import { OverlayPanel } from 'primereact/overlaypanel'
import { ProductService } from '../../../listing/service/ProductService'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Paginator } from 'primereact/paginator'

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

import {
    exportCSV,
    exportPdf,
    exportExcel
} from '../controller/DataviewExport'

const layoutButton = (layout, callback) => {
    return (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => callback(e.value)} />
        </div>
    )
}

const searchBar = (loading, globalFilterValue, onGlobalFilterChange) => {
    return (
        <div className='flex'>
            <div className='flex me-1'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText disabled={loading} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Pesquise por qualquer campo...'
                        style={{
                            minWidth: '300px'
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

const exportButton = (optionsExport, dataTableRef, results, exportColumns, exportOverPanelRef) => {
    /**
     * @type {Array}
     */
    const extensions = optionsExport?.extensions
    return (
        <div className="flex">
            <Button
                type={optionsExport?.severity || 'button'}
                size={optionsExport?.severity || 'small'}
                severity={optionsExport?.severity || 'success'}
                icon={optionsExport?.icon || 'pi pi-file-export'}
                label={optionsExport?.label || 'Exportar'}
                onClick={(e) => exportOverPanelRef.current.toggle(e)} />
            <OverlayPanel ref={exportOverPanelRef}>
                {
                    (optionsExport?.xlsx || extensions.includes('xlsx')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.xlsx?.type || 'button'}
                                className={optionsExport?.xlsx?.className || ''}
                                size={optionsExport?.xlsx?.size || 'small'}
                                severity={optionsExport?.xlsx?.severity || 'success'}
                                label={optionsExport?.xlsx?.label || 'Planilha (.xlsx)'}
                                icon={optionsExport?.xlsx?.icon || 'pi pi-file-excel'}
                                style={optionsExport?.xlsx?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportExcel(results, optionsExport?.fileName)
                                }} />
                        </div>
                    ) : ''
                }
                {
                    (optionsExport?.pdf || extensions.includes('pdf')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.pdf?.type || 'button'}
                                className={optionsExport?.pdf?.className || ''}
                                size={optionsExport?.pdf?.size || 'small'}
                                severity={optionsExport?.pdf?.severity || 'primary'}
                                label={optionsExport?.pdf?.label || 'Documento (.pdf)'}
                                icon={optionsExport?.pdf?.icon || 'pi pi-file-pdf'}
                                style={optionsExport?.pdf?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportPdf(results, optionsExport?.fileName, exportColumns)
                                }} />
                        </div>
                    ) : ''
                }
                {
                    (optionsExport?.csv || extensions.includes('csv')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.csv?.type || 'button'}
                                className={optionsExport?.csv?.className || ''}
                                size={optionsExport?.csv?.size || 'small'}
                                severity={optionsExport?.csv?.severity || 'secondary'}
                                label={optionsExport?.csv?.label || 'Arquivo (.csv)'}
                                icon={optionsExport?.csv?.icon || 'pi pi-file'}
                                style={optionsExport?.csv?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportCSV(dataTableRef, false)
                                }} />
                        </div>
                    ) : ''
                }
            </OverlayPanel>
        </div>
    )
}

const sortButton = (sorts, sortKey, onSortChange) => {
    // console.log('sortOptions', sortOptions, 'sortKey', sortKey, 'onSortChange', onSortChange)

    /**
     * 
     * @param {*} value 
     * @param {Array} sortOptions 
     */
    const getState = (value, sortOptions) => {
        const sortTest = sortOptions.filter((item) => {
            return item.value === value
        })[0]
        // console.log('sortTest', sortTest)
        return sortTest
    }

    const getOptions = (_options) => {
        const options = []
        _options.forEach((item) => {
            options.push({
                label: item.label,
                value: item.value
            })
        })
        return options
    }

    return (
        <div className="flex">
            <Dropdown
                options={getOptions(sorts.sortOptions)}
                value={sortKey}
                placeholder="Orderder resultados"
                optionLabel="label"
                onChange={(e) => {
                // console.log('event aq', e)
                const actualState = getState(e.value, sorts.sortOptions)
                // console.log('test', actualState)
                onSortChange({
                    sortField: actualState.sorts.sortField,
                    sortOrder: actualState.sorts.sortOrder,
                    sortKey: e.value
                })
            }}
                className="w-full sm:w-14rem"
            />
        </div>
    )
}

const header = (title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, optionsExport, dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, exportColumns) => {
    return (
        <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
            <div className="flex me-auto">
                <h4 className="m-0">{title}</h4>
            </div>
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