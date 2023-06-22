/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Listing App Component Imports
import Datatable from '../../@core/components/datatable'
// import Sidebar from './Sidebar'

// *API DE FILTROS
import { FilterMatchMode, FilterOperator } from 'primereact/api'

// ** Third Party Components
// import classnames from 'classnames'

// ** Styles
// import '@styles/react/apps/app-email.scss'

import { ProductService } from '../../@core/components/listing/service/ProductService'

const testListing = () => {
    // ** States

    const [products, setProducts] = useState([])

    const template = {
        grid: (<></>),
        list: (<></>)
    }

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            setProducts(data.slice(0, 12))
        })
    }, [])

    // *componentOptions options
    const componentOptions = {
        layout: {
            sm: 'grid',
            md: 'grid',
            lg: 'grid',
            xl: 'list',
            xxl: 'table'
        }, // grid, list, table
        sort: {
            by: 'name',
            order: 'asc',
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        filters: [
            {
                field: 'name',
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            {
                field: 'category',
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            }
        ],
        baseUrl: '/users/{id}',
        paginator: {
            currentPage: 0,
            totalPages: 0,
            peerPage: 5,
            totalRecords: 0
        }
    }

    return (
        <Fragment>
            <div className='content-right'>
                <div className='content-body'>
                    <Datatable data={products} template={template} />
                </div>
            </div>
        </Fragment>
    )
}

export default testListing
