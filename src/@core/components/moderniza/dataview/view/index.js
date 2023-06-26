/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DataView } from 'primereact/dataview'

// *MVC
import { DataviewRequest } from '../controller'
import { DataviewRequestEvent, DataviewOptions } from '../model'

// *HEADER
import { header } from './header.js'

// *FOOTER
import { footer } from './footer.js'

// *STYLES
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css' 
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

/**
 * View component
 * 
 * @param {Object|DataviewOptions} props.options view options
 * @returns {JSX.Element}
 */
const View = (props) => {

    /**
     * Component options
     * @type {DataviewOptions}
     */
    const options = props.options.build ? props.options : new DataviewOptions(props.options)
    const templates = options.templates

    // *REFERENCES
    const dataTableRef = useRef(null)
    const dataViewRef = useRef(null)
    const exportOverPanelRef = useRef(null)

    const exportColumns = options.templates.columns.map((col) => {
        return { title: col.header, dataKey: col.field }
    })

    // ? LAYOUT REFACTORY: colocar no dataviewoptions com demais validações
    const supportedLayouts = ['grid', 'list', 'table']

    const [layout, setLayout] = useState(options.type)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState(options?.title || false)

    // ? REFACTORY: PAGINATION
    const peerPageDefaultOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 }
    ]

    const [peerPageOptions] = useState(options?.pagination?.peerPageOptions.map(function (quantity) {
        return { label: quantity, value: quantity }
    }) || peerPageDefaultOptions)

    const [page, setPage] = useState(0)
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(options?.pagination?.peerPage || 5)
    const [totalRecords, setTotalRecords] = useState(0)

    // *SORTS
    const [sortField, setSortField] = useState(options?.sorts?.sortField || null)
    const [sortOrder, setSortOrder] = useState(options?.sorts?.sortOrder || 1)

    // * FILTERS
    const [filters, setFilters] = useState(options?.filters || [])

    // *GLOBAL FILTER
    const [globalFilterValue, setGlobalFilterValue] = useState(options?.filters?.global?.value || '')

    // *DATAVIEW RESULTS
    const [results, setResults] = useState([])

    // *FRESH THE COMPONENT
    const freshComponent = async () => {

        setLoading(true)
        setResults([])
        setTotalRecords(0)

        const request = await DataviewRequest(
            options.onRequest,
            new DataviewRequestEvent({
                pagination: {
                    page,
                    peerPage: rows
                },
                sorts: {
                    sortField,
                    sortOrder
                },
                filters
            })
        )

        if (request.content && request.total) {
            setResults(request.content)
            setTotalRecords(request.total)
        }

        setLoading(false)

    }

    // *EFFECT TO SEARCH WHEN USER STOPS TYPING
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (options.filters) {
                if (filters.global.value !== globalFilterValue) {
                    filters.global.value = globalFilterValue
                    freshComponent()
                }
            }
        }, 3000)
        return () => clearTimeout(delayDebounceFn)
    }, [globalFilterValue])


    // *START EFFECT
    useEffect(() => {
        freshComponent()
    }, [page, sortField, sortOrder, rows])

    // *SORT CALLBACK
    const onSortChange = (e) => {
        if (options.onSortChange) options.onSortChange(e)
        setSortField(e.sortField)
        setSortOrder(e.sortOrder)
    }

    // *PAGE CALLBACK
    const onPageChange = (e, index) => {
        if (e.page !== page) {
            if (options.onPageChange) options.onPageChange(e, index)
            setPage(e.page)
            setFirst(e.first)
            setRows(e.rows)
        }
    }

    //*FILTER CALLBACK
    const onFilterChange = (e) => {
        if (options.onFilterChange) options.onFilterChange(e)
    }

    // *GLOBAL FILTER CALLBACK
    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = {}
        _filters = { ...filters }
        setGlobalFilterValue(value)
        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    // *LAYOUT CALLBACK
    const onChangeLayout = (newLayout) => {
        setLayout(newLayout)
    }

    // *PEERPAGE CALLBACK
    const onChangePeerPageCallback = (e) => {
        setFirst(0)
        setRows(e.value)
    }

    const getGlobalFiltersFields = () => {
        return Object.keys(filters).filter(function (item) {
            return item !== 'global'
        })
    }

    const itemTemplate = (row, actualLayout) => {
        return options.templates[actualLayout](row)
    }

    return (
        <div>
            {
                console.log('results', results, 'first', first, 'rows', rows, 'total', totalRecords, 'options', options)
            }
            {
                layout === 'grid' || layout === 'list' ? (
                    <>
                        <div className="card">
                            <DataView
                                ref={dataViewRef}
                                value={results}
                                layout={layout}
                                itemTemplate={itemTemplate}
                                header={header(
                                    title,
                                    loading,
                                    layout,
                                    onChangeLayout,
                                    globalFilterValue,
                                    onGlobalFilterChange,
                                    options.export
                                )}
                                footer={footer(
                                    first,
                                    rows,
                                    totalRecords,
                                    onPageChange,
                                    peerPageOptions,
                                    onChangePeerPageCallback
                                )}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <DataTable
                            ref={dataTableRef}
                            loading={loading}
                            header={header(
                                title,
                                loading,
                                layout,
                                onChangeLayout,
                                globalFilterValue,
                                onGlobalFilterChange,
                                options.export,
                                dataTableRef,
                                exportOverPanelRef,
                                // ? REFACTORY: send empty data if export options is not present
                                !options.export ? [] : results,
                                exportColumns
                            )}
                            value={results}
                            filters={filters}
                            exportFilename={options.export.fileName}
                            globalFilterFields={getGlobalFiltersFields()}
                            filterDisplay="menu"
                            footer={footer(
                                first,
                                rows,
                                totalRecords,
                                onPageChange,
                                peerPageOptions,
                                onChangePeerPageCallback
                            )}
                            onSort={onSortChange}
                            onFilter={onFilterChange}
                            sortField={sortField}
                            sortOrder={sortOrder}
                        >
                            {templates.columns.map((col, i) => (
                                <Column
                                    key={col.field}
                                    dataType={col.dataType}
                                    field={col.field}
                                    filter={col.filter}
                                    filterField={col.filterField}
                                    filterElement={col.filterElement}
                                    sortable={col.sortable}
                                    sortField={col.sortField}
                                    header={col.header}
                                    body={col.body}
                                />
                            ))}
                        </DataTable>
                    </>
                )
            }
        </div>
    )
}

export default View