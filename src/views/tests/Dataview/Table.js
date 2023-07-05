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
import { Row, Col, Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap'

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
        <Card className="mb-0 p-1">
            <Row>
                <Col xs="auto" className="my-auto">
                    <img className="w-9 shadow-2 rounded-circle" src={'https://picsum.photos/200'} alt={row.title} style={{ height: '50px' }} />
                </Col>
                <Col className="my-auto">
                    <h2>Title</h2>
                    <p>{row.title}</p>
                </Col>
                <Col className="my-auto">
                    <h2>Score</h2>
                    <p>{row._score}</p>
                </Col>
            </Row>
        </Card>
    )
}

const grid = (row) => {
    return (
        <Col xs="12" md="6" lg="4" className="p-1">
            <Card className="mb-0">
                <CardBody>
                    <CardTitle tag="h5">{row.title}</CardTitle>
                    <CardSubtitle
                        className="mb-0 text-muted"
                        tag="h6"
                    >{row.api_model}</CardSubtitle>
                </CardBody>
                <img src={'https://picsum.photos/200'} alt={row.title} />
                <CardBody>
                    <CardText>Score: {row._score}</CardText>
                </CardBody>
            </Card>
        </Col>
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

const customFilter = (value, rowData) => {
    return value
}

const optionsTable = {
    title: 'Listagem de artistas', //?optional
    type: 'list',
    height: 'calc(100vh - 130px)',
    templates: {
        columns, // *table
        list, // *list
        grid // *grid
    },
    pagination: {
        visible: true,
        page: 0,
        peerPage: 30
    },
    filters: {
        global: { value: 'Jose', matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        id: { operator: FilterOperator.OR, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
        _score: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.GREATER_THAN }] }
    },
    sorts: {
        visible: true,
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
        // visible: true
        // label: 'Novo',
        // icon: 'pi pi-plus',
        // severity: 'primary',
        // className: '',
        // style: {},
        // onClick: (e) => {
        //     console.log('add event', e)
        // }
    },
    export: {
        // visible: true,
        extensions: ['xlsx', 'pdf', 'csv'],
        fileName: 'artists'
    },
    responsive: {
        xs: 'grid',
        sm: 'grid',
        md: 'list',
        lg: 'list',
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
