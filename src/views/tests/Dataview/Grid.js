/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment } from 'react'

import { Dataview } from '../../../@core/components/moderniza'
import { DataviewRequestContent, DataviewOptions, DataviewRequestEvent } from '../../../@core/components/moderniza/dataview/model'

import { Calendar } from 'primereact/calendar'

// ** Listing App Component Imports
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'

/**
 * @param {DataviewRequestEvent} event
 */
const getData = async (event) => {
    const axios = require('axios')
    const page = event.pagination.page + 1
    const peerPage = event.pagination.peerPage
    const sortField = event.sorts.sortField || ''
    const sortOrder = event.sorts.sortOrder === 1 ? 'asc' : 'desc'

    let options = {
        method: 'GET',
        url: `https://api.artic.edu/api/v1/artists/search`,
        params: {
            limit: peerPage,
            page
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

// get a rondom severity
const getSeverity = () => {
    const severities = ['success', 'info', 'warning', 'danger']
    return severities[Math.floor(Math.random() * severities.length)]
}

const listItem = (row) => {
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

const cardItem = (row) => {
    return (
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
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

const optionsCard = {
    type: 'grid',
    templates: {
        grid: cardItem,
        list: listItem
    },
    request: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET'
    },
    pagination: {
        page: 1,
        totalPages: 1,
        peerPage: 10,
        total: 0
    },
    sorts: {
        sortField: 'title',
        sortOrder: 1
    },
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

const testDataview = () => {
    // ** States

    return (
        <Fragment>
            <div className='content-right'>
                <div className='content-body'>
                    <Dataview options={optionsCard} />
                </div>
            </div>
        </Fragment>
    )
}

export default testDataview
