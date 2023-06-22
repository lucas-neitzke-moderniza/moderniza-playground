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
        console.log('response', response)
        return response
    } catch (error) {
        throw new Error(error.message)
    }
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
            console.log('options', options)
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
            console.log('options', options)
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
            console.log('options', options)
            return <InputNumber value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row._score}</span>
        }
    }
]

const optionsTable = {
    title: 'Artistas',
    type: 'table',
    templates: {
        columns
    },
    pagination: {
        page: 0,
        peerPage: 5
    },
    filters: {
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        id: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        _score: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] }
    },
    /**
     * @param {DataviewRequestEvent} event
     * @returns {DataviewRequestContent}
     */
    onRequest: async (event) => {
        const response = await getData(event)
        const content = response.data.data
        const total = response.data.pagination.total

        console.log('aqui', content, total)

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
        console.log('onSortChangeExternal', ev)
    }
}

const options = new DataviewOptions(optionsTable)

const testDataview = () => {
    return (
        <Fragment>
            <div className='content-right'>
                <div className='content-body'>
                    <Dataview options={options} />
                </div>
            </div>
        </Fragment>
    )
}

export default testDataview
