/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Component Imports
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'

// * PRIME API
import { FilterMatchMode, FilterOperator } from 'primereact/api'

// ** moderniza
import { Dataview } from '../../../@core/components/moderniza'

import { DataviewRequestContent, DataviewOptions, DataviewRequestEvent } from '../../../@core/components/moderniza/dataview/model'

/**
 * @param {DataviewRequestEvent} event
 */
const getData = async (event) => {
    const axios = require('axios')
    const page = event.pagination.page + 1
    const peerPage = event.pagination.peerPage
    const sortField = event.sorts.sortField || ''
    const sortOrder = event.sorts.sortOrder === 1 ? 'asc' : 'desc'
    const globalFilter = event.filters.global.value

    let options = {
        method: 'GET',
        url: `https://api.artic.edu/api/v1/artists/search`,
        params: {
            limit: peerPage,
            page: String(page),
            q: globalFilter
        }
    }

    try {
        const response = await axios.request(options)
        // console.log('response', response)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
}

const getSeverity = () => {
    const severities = ['success', 'info', 'warning', 'danger']
    return severities[Math.floor(Math.random() * severities.length)]
}

const list = (row) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={'https://picsum.photos/200'} alt={row.title} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{row.title}</div>
                        <Rating value={row.rating} readOnly cancel={false}></Rating>
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{row.category}</span>
                            </span>
                            <Tag value={row.inventoryStatus} severity={getSeverity()}>Teste</Tag>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">${row.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={row.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const grid = (row) => {
    return (
        <div className="col-12 sm:col-6 lg:col-4 xl:col-4 p-2">
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag"></i>
                        <span className="font-semibold">{row.category}</span>
                    </div>
                    <Tag value={row.inventoryStatus} severity={getSeverity()}>Teste</Tag>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <img className="w-9 shadow-2 border-round" src={'https://picsum.photos/200'} alt={row.title} />
                    <div className="text-2xl font-bold">{row.title}</div>
                    <Rating value={row.rating} readOnly cancel={false}></Rating>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">${row.price}</span>
                    <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={row.inventoryStatus === 'OUTOFSTOCK'}></Button>
                </div>
            </div>
        </div>
    )
}

const columns = [
    {
        header: 'Id',
        field: 'id',
        sortable: true,
        sortField: 'id',
        filter: true,
        filterField: 'id',
        filterElement: (options) => {
            return <InputText value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.id}</span>
        }
    },
    {
        header: 'Title',
        field: 'title',
        sortable: true,
        sortField: 'title',
        filter: true,
        filterField: 'title',
        filterElement: (options) => {
            return <InputText value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.title}</span>
        }
    },
    {
        header: 'Score',
        field: '_score',
        dataType: 'numeric',
        sortable: true,
        sortField: '_score',
        filter: true,
        filterField: '_score',
        filterElement: (options) => {
            return <InputNumber value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row._score}</span>
        }
    }
]

const optionsTable = {
    title: 'Artistas', //?optional
    type: 'table',
    templates: {
        columns, // *table
        list, // *list
        grid // *grid
    },
    pagination: {
        page: 0,
        peerPage: 5
    },
    // TODO: Tratar filtro global
    filters: {
        global: { value: 'Jose', matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        id: { operator: FilterOperator.OR, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
        _score: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.GREATER_THAN }] }
    },
    sorts: {
        sortField: 'title',
        sortOrder: 1,
        sortOptions: [
            {
                label: 'Menor score',
                value: 'score_ascending',
                sorts: {
                    sortOrder: 1,
                    sortField: '_score'
                }
            },
            {
                label: 'Maior score',
                value: 'score_descending',
                sorts: {
                    sortOrder: -1,
                    sortField: '_score'
                }
            }
        ]
    },
    // TODO: Botão adicionar
    add: {
        label: 'Novo',
        icon: 'pi pi-plus',
        severity: 'primary',
        className: '',
        style: {},
        onClick: () => {
            console.log('add')
        }
    },
    export: {
        extensions: ['xlsx', 'pdf', 'csv'],
        fileName: 'artists'
    },
    responsive: {
        xs: 'list',
        sm: 'list',
        md: 'grid',
        lg: 'grid',
        xl: 'table',
        xxl: 'table'
    },
    /**
     * @param {DataviewRequestEvent} event
     * @returns {DataviewRequestContent}
     */
    onRequest: async (event) => {
        const response = await getData(event)
        const content = response.data.data
        const total = response.data.pagination.total

        // console.log('aqui', content, total)

        return new DataviewRequestContent({
            content,
            total
        })

    },
    onPageChange: (ev, index) => {
        console.log('onPageChangeExternal', ev, index)
    },
    onSortChange: (ev) => {
        console.log('onSortChangeExternal', ev)
    },
    onFilterChange: (ev) => {
        console.log('onFilterChangeExternal', ev)
    }
}

const options = new DataviewOptions(optionsTable)

const testDataview = () => {
    return (
        <Fragment>
            <div className='content-right'>
                <div className='content-body'>
                    <Dataview options={options} />
                    {/* <Dataview options={optionsTable} /> */}
                </div>
            </div>
        </Fragment>
    )
}

export default testDataview
