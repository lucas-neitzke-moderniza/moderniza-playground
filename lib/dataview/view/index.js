/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DataView } from 'primereact/dataview'

// *MVC
import { DataviewRequest, DataviewDeviceSize, DataviewResponsive } from '../controller'
import { DataviewRequestEvent, DataviewOptions } from '../model'

// *HEADER
import { header } from './header.js'

// *FOOTER
import { footer } from './footer.js'

/**
 * View component
 * 
 * @param {Object|DataviewOptions} props.options view options
 * @returns {JSX.Element}
 */
const View = props => {
  /**
   * Component options
   * @type {DataviewOptions}
   */
  const options = props.options.build ? props.options : new DataviewOptions(props.options)
  console.log('options', options)
  const templates = options.templates

  // *REFERENCES
  const dataTableRef = useRef(null)
  const dataViewRef = useRef(null)
  const exportOverPanelRef = useRef(null)
  const exportColumns = options?.templates?.columns ? options.templates.columns.map(col => {
    return {
      title: col.header,
      dataKey: col.field
    }
  }) : []
  const [layout, setLayout] = useState(options.type)
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState(options?.title || false)

  // ? REFACTORY: PAGINATION
  const peerPageDefaultOptions = [
{
    label: 5,
    value: 5
  }, {
    label: 10,
    value: 10
  }, {
    label: 20,
    value: 20
  }, {
    label: 30,
    value: 30
  }
]
  const [peerPageOptions] = useState(options?.pagination?.peerPageOptions)
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(options?.pagination?.peerPage || 5)
  const [totalRecords, setTotalRecords] = useState(0)

  // *SORTS
  const [sortKey, setSortKey] = useState('')
  const [sortField, setSortField] = useState(options?.sorts?.sortField || null)
  const [sortOrder, setSortOrder] = useState(options?.sorts?.sortOrder || 1)

  // * FILTERS
  const [filters, setFilters] = useState(options?.filters || [])

  // *GLOBAL FILTER
  const [globalFilterValue, setGlobalFilterValue] = useState(options?.filters?.global?.value || '')

  // *DATAVIEW RESULTS
  const [results, setResults] = useState([])

  // *RESPONSIVE
  const lastDeviceSize = DataviewDeviceSize()
  const [deviceSize, setDeviceSize] = useState(lastDeviceSize)
  useEffect(() => {
    // console.log('lastDeviceSize', lastDeviceSize)
    if (typeof lastDeviceSize.width === 'number' && typeof lastDeviceSize.height === 'number' && options.responsive) {
      // console.log('passei aqui')
      setDeviceSize(lastDeviceSize)
      DataviewResponsive(viewportLayout => {
        // console.log('viewportLayout', viewportLayout)
        if (layout !== viewportLayout) {
          setLayout(viewportLayout)
        }
      }, options?.type, lastDeviceSize, options?.responsive)
    }
  }, [lastDeviceSize])

  // *FRESH THE COMPONENT
  const freshComponent = async () => {
    setLoading(true)
    setResults([])
    setTotalRecords(0)
    const request = await DataviewRequest(options.onRequest, new DataviewRequestEvent({
      pagination: {
        page,
        peerPage: rows
      },
      sorts: {
        sortField,
        sortOrder
      },
      filters
    }))
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
  const onSortChange = e => {
    // console.log('event dela', e)
    if (options.onSortChange) options.onSortChange(e)
    if (e.sortKey) setSortKey(e.sortKey)
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
  const onFilterChange = e => {
    if (options.onFilterChange) options.onFilterChange(e)
  }

  // *GLOBAL FILTER CALLBACK
  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = {}
    _filters = {
      ...filters
    }
    setGlobalFilterValue(value)
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // *LAYOUT CALLBACK
  const onChangeLayout = newLayout => {
    setLayout(newLayout)
  }

  // *PEERPAGE CALLBACK
  const onChangePeerPageCallback = e => {
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
  return /*#__PURE__*/React.createElement("div", null, layout === 'grid' || layout === 'list' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataView, {
    className: "mdz-dataview-component",
    ref: dataViewRef,
    loading,
    value: results,
    layout,
    itemTemplate,
    header: header(title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, options.export, options.sorts, sortKey, onSortChange, undefined, options.sorts, options.add, lastDeviceSize),
    footer: footer(first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback, options.pagination, deviceSize)
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataTable, {
    className: "mdz-datatable-component",
    ref: dataTableRef,
    loading,
    header: header(title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, options.export, dataTableRef, exportOverPanelRef, !options.export ? [] : results, exportColumns, options.sorts, options.add, lastDeviceSize),
    value: results,
    filters,
    exportFilename: !options.export ? '' : options.export.fileName,
    globalFilterFields: getGlobalFiltersFields(),
    filterDisplay: "menu",
    footer: footer(first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback, options.pagination, deviceSize),
    onSort: onSortChange,
    onFilter: onFilterChange,
    sortField,
    sortOrder
  }, templates.columns.map((col, i) => /*#__PURE__*/React.createElement(Column, {
    key: col.field,
    dataType: col.dataType,
    field: col.field,
    filter: col.filter,
    filterField: col.filterField,
    filterElement: col.filterElement,
    sortable: col.sortable,
    sortField: col.sortField,
    header: col.header,
    body: col.body
  })))), /*#__PURE__*/React.createElement("style", null, `.mdz-datatable-component, .mdz-dataview-component{height: ${options?.height} !important;}`))
}
export default View