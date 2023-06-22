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

// *API DE FILTROS
import { FilterMatchMode, FilterOperator } from 'primereact/api'

// *MVCS
import { DataviewRequest } from '../controller'
import { DataviewRequestEvent, DataviewRequestContent, DataviewOptions } from '../model'

// *headers
import { viewHeader, header } from './header.js'

// *footers
import { footer } from './footer.js'

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
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
     * @type {DataviewOptions}
     */
    const options = props.options.build ? props.options : new DataviewOptions(props.options)

    // * LAYOUT
    const supportedLayouts = ['grid', 'list', 'table']
    const [layout, setLayout] = useState(options.type)
    const [loading, setLoading] = useState(true)
    const templates = options.templates
    console.log('templates', templates)
    const [title, setTitle] = useState(options.title)

    // * PAGINATION
    const [page, setPage] = useState(0)
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const [results, setResults] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)

    // *SORTS
    const [sortField, setSortField] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)

    // * FILTERS
    const [filters, setFilters] = useState(options?.filters || [])
    console.log('filters', filters)

    // *GLOBAL FILTER
    const [globalFilterValue, setGlobalFilterValue] = useState(options?.filters?.global?.value || '')

    const freshComponent = async () => {

        setLoading(true)
        setResults([])
        setTotalRecords(0)
        // *START REQUEST
        const _results = await DataviewRequest(
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

        console.log('reuslts', _results)

        const content = _results.build ? _results : new DataviewRequestContent(_results)

        if (content.content && content.total) {
            setResults(content.content)
            setTotalRecords(content.total)
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
    }, [page, sortField, sortOrder])

    const onSortChange = (e) => {
        if (options.onSortChange) options.onSortChange(e)
        setSortField(e.sortField)
        setSortOrder(e.sortOrder)
    }

    const onPageChange = (e, index) => {
        if (e.page !== page) {
            if (options.onPageChange) options.onPageChange(e, index)
            setPage(e.page)
            setFirst(e.first)
            setRows(e.rows)
        }
    }

    const onFilterChange = (e) => {
        if (options.onFilterChange) options.onFilterChange(e)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = {}
        _filters = { ...filters }
        setGlobalFilterValue(value)
        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    const onChangeLayout = (newLayout) => {
        setLayout(newLayout)
    }

    const getGlobalFilters = () => {

        const keys = Object.keys(filters).filter(function (item) {
            return item !== 'global'
        })

        console.log('filters keys', keys)
        return keys
    }

    const itemTemplate = (row, actualLayout) => {
        return options.templates[actualLayout](row)
    }

    return (
        <div>
            {
                console.log('results', results, 'first', first, 'rows', rows, 'total', totalRecords)
            }
            {
                layout === 'grid' || layout === 'list' ? (
                    <>
                        <div className="card">
                            <DataView
                                value={results}
                                layout={layout}
                                itemTemplate={itemTemplate}
                                header={header(
                                    title,
                                    loading,
                                    layout,
                                    onChangeLayout,
                                    globalFilterValue,
                                    onGlobalFilterChange
                                )}
                                footer={footer(
                                    first,
                                    rows,
                                    totalRecords,
                                    onPageChange
                                )}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <DataTable
                            loading={loading}
                            header={header(
                                title,
                                loading,
                                layout,
                                onChangeLayout,
                                globalFilterValue,
                                onGlobalFilterChange
                            )}
                            value={results}
                            filters={filters}
                            globalFilterFields={getGlobalFilters()}
                            // globalFilterMatchMode="contains"
                            // filterDisplay="menu"
                            footer={footer(
                                first,
                                rows,
                                totalRecords,
                                onPageChange
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
                                    filterField={col.filter}
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