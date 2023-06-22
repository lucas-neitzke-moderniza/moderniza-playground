/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'

// *API DE FILTROS
import { FilterMatchMode, FilterOperator } from 'primereact/api'

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
import { CustomerService } from './service/CustomerService'
import { Paginator } from 'primereact/paginator'

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

import './flags.css'

export default function CustomersDemo() {
    const [customers, setCustomers] = useState([])
    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const [results, setResults] = useState([])
    const [totalRecords, setTotalRecords] = useState(0)
    const [globalFilterValue, setGlobalFilterValue] = useState('')
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ])

    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal'])
    const dt = useRef(null)
    const op = useRef(null)
    const op2 = useRef(null)
    const op3 = useRef(null)

    const cols = [
        { field: 'name', header: 'name' },
        { field: 'country', header: 'country' },
        { field: 'representative', header: 'representative' },
        { field: 'date', header: 'date' },
        { field: 'balance', header: 'balance' },
        { field: 'status', header: 'status' },
        { field: 'activity', header: 'activity' }
    ]

    const exportColumns = cols.map((col) => {
        console.log('col', col)
        return { title: col.header, dataKey: col.field }
    })

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger'

            case 'qualified':
                return 'success'

            case 'new':
                return 'info'

            case 'negotiation':
                return 'warning'

            case 'renewal':
                return null
        }
    }

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date)

            return d
        })
    }

    useEffect(() => {
        CustomerService.getCustomersLarge().then((data) => {
            setCustomers(getCustomers(data))
            setResults(getCustomers(data).slice(first, first + rows))
            setTotalRecords(getCustomers(data).length)
        })
    }, [])


    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = {}
        _filters = { ...filters }
        _filters['global'].value = value

        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly })
    }

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0)

                const overrideCustomers = customers.map((customer) => {
                    for (const key in customer) {
                        if (typeof customer[key] === 'object' && typeof customer[key].getDate !== 'function') {
                            customer[key] = customer[key].name

                        }
                    }

                    return {
                        ...customer
                    }
                })

                doc.autoTable(exportColumns, overrideCustomers)
                doc.save('customers.pdf')
            })
        })
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                const EXCEL_EXTENSION = '.xlsx'
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                })

                module.default.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`)
            }
        })
    }

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(customers)
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            })

            saveAsExcelFile(excelBuffer, 'customers')
        })
    }

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h4 className="m-0">Usuários</h4>
                <div className='flex'>
                    <div className='flex me-1'>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Pesquise por qualquer campo...'
                                style={{
                                    minWidth: '300px'
                                }}
                            />
                        </span>
                    </div>
                    <div className="flex align-items-center justify-content-end gap-2">
                        <Button type="button" size='small' severity='success' icon="pi pi-file-export" label="Exportar" onClick={(e) => op.current.toggle(e)} />
                        <OverlayPanel ref={op}>
                            <div className='mb-1'>
                                <Button type="button" size="small" label="Excel (.xls)"
                                    icon="pi pi-file-excel" severity="success" data-pr-tooltip="XLS"
                                    style={{ width: '160px' }}
                                    onClick={exportExcel} />
                            </div>
                            <div className='mb-1'>
                                <Button size="small" type="button" label="Documento (.pdf)"
                                    icon="pi pi-file-pdf" severity="primary" data-pr-tooltip="PDF"
                                    style={{ width: '160px' }}
                                    onClick={exportPdf} />
                            </div>
                            <div>
                                <Button type="button" size="small" label="Texto (.csv)"
                                    icon="pi pi-file" severity="info" data-pr-tooltip="CSV"
                                    style={{ width: '160px' }}
                                    onClick={() => exportCSV(false)} />
                            </div>
                        </OverlayPanel>
                        <Button type="button" size='small' icon="pi pi-cog"
                            onClick={(e) => op3.current.toggle(e)}></Button>
                        <OverlayPanel ref={op3}>
                            <div>
                                <Button type="button" size="small" label="Apagar seleção"
                                    icon="pi pi-trash" severity="danger" data-pr-tooltip="Apagar seleção"
                                    style={{ width: '160px' }}
                                    onClick={() => dt.current.reset()} />
                            </div>
                        </OverlayPanel>
                        <Button severity='primary' size='small' icon="pi pi-plus" label="Novo" />
                    </div>
                </div>
            </div>
        )
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        )
    }

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative

        return (
            <div className="flex align-items-center gap-2">
                <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                <span>{representative.name}</span>
            </div>
        )
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        )
    }

    const representativeFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <div className="mb-3 font-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </React.Fragment>
        )
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date)
    }

    const dateFilterTemplate = (options) => {
        console.log('options', options)
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance)
    }

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    }

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />
    }

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>
    }

    const activityFilterTemplate = (options) => {
        return (
            <>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </>
        )
    }

    const actionBodyTemplate = () => {
        return (
            <>
                <Button type="button" icon="pi pi-cog"
                    rounded
                    onClick={(e) => op2.current.toggle(e)}></Button>
                <OverlayPanel ref={op2}>
                    <div className="flex flex-col gap-2">
                        <Button severity='primary' type="button" icon="pi pi-search" size='small' label="Visualizar" />
                        <Button severity='info' type="button" icon="pi pi-pencil" size='small' label="Editar" />
                        <Button severity='danger' type="button" icon="pi pi-trash" size='small' label="Apagar" />
                    </div>
                </OverlayPanel>
            </>
        )
    }

    const handdleTerm = () => {
        console.log('used normal')
        console.log(results)
        console.log(results.slice(first, first + rows))
        if (rows === totalRecords) {
            setResults(customers.slice(0, rows))
        } else {
            setResults(customers.slice(first, first + rows))
        }
        setTotalRecords(customers.length)
    }

    useEffect(() => {
        handdleTerm()
    }, [currentPage, first, rows])

    const onPageChange = (e, index) => {
        if (e.page !== currentPage) {
            setCurrentPage(e.page)
            setFirst(e.first)
            setRows(e.rows)
        }
    }

    const paginatorLeft = () => {
        return (
            <div>{totalRecords} Resultados</div>
        )
    }

    const [dropdownOptions] = useState([
        { label: 2, value: 2 },
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 'All', value: totalRecords }
    ])

    useEffect(() => {
        // * Set the 'All' option with the totalRecords
        dropdownOptions.map((item) => {
            if (item.label === 'All') {
                item.value = totalRecords
            }
            item.disabled = false
            return item
        })
    }, [totalRecords])

    const paginatorRight = () => {
        return (
            <Dropdown value={rows} options={dropdownOptions} onChange={(e) => {
                setFirst(0)
                setRows(e.value === totalRecords ? totalRecords : e.value)
            }} />
        )
    }

    const footer = () => {
        return <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            rightContent={paginatorRight}
            leftContent={paginatorLeft}
        />
    }

    const header = renderHeader()

    return (
        <>
            {
                console.log('first', first, 'rows', rows, 'totalRecords', totalRecords, 'results', results)
            }
            <div className="card">
                <DataTable
                    className='mdz-datatable-component'
                    footer={footer()}
                    first={first}
                    ref={dt}
                    scrollable
                    scrollHeight="flex"
                    value={results}
                    header={header}
                    rows={rows}
                    dataKey="id" selectionMode="checkbox" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No customers found." currentPageReportTemplate="{totalRecords} Resultados">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                    <Column field="country.name" header="Country" sortable filterField="country.name" style={{ minWidth: '14rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                    <Column header="Agent" sortable sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }}
                        style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterElement={representativeFilterTemplate} />
                    <Column field="date" header="Date" sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                    <Column field="balance" header="Balance" sortable dataType="numeric" style={{ minWidth: '12rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                    <Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                    <Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </>
    )
}
