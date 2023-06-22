/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react'
import { ProductService } from '../listing/service/ProductService'
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { OrderList } from 'primereact/orderlist'
import { Rating } from 'primereact/rating'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import 'primeflex/primeflex.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'                     // core css
import 'primeicons/primeicons.css'                             // icons
import { Paginator } from 'primereact/paginator'

export default function BasicDemo() {
    const [products, setProducts] = useState([])
    const [results, setResults] = useState([])
    const [layout, setLayout] = useState('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [linkSize, setLinkSize] = useState(5)
    const inputRef = useRef()


    const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
        { label: 'All', value: products.length }
    ]

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            setProducts(data.slice(0, 12))
            setResults(data.slice(0, 12))
            // setTotalRecords(12)
            console.log('passei aqui')
        })
    }, [])


    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success'

            case 'LOWSTOCK':
                return 'warning'

            case 'OUTOFSTOCK':
                return 'danger'

            default:
                return null
        }
    }

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        )
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return
        }

        if (layout === 'list') return listItem(product)
        else if (layout === 'grid') return gridItem(product)
    }

    const handleSearch = () => {
        if (searchTerm !== '') {

            console.log(searchTerm)

            const _results = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm)
            }).slice(first, first + rows)

            if (_results.length <= 5) {
                setRows(5)
            } else if (_results.length > 5 && _results.length < 10) {
                setRows(10)
            } else if (_results.length > 10 && _results.length < 10) {
                setRows(20)
            } else if (_results.length > 20 && _results.length < 30) {
                setRows(30)
            } else {
                setRows(_results.length)
            }

            console.log(_results)
            setResults(_results) // Fatie corretamente os resultados
            // setRows(_results.length)
            setTotalRecords(_results.length)
            //setTotalRecords(_results.length)
        } else {
            console.log('notthign')
            console.log('firs', first)
            setFirst(0)
            setResults(products.slice(first, first + rows))
            // Fatie corretamente os resultados
            setTotalRecords(products.length)
            //setTotalRecords(products.length)
        }
        //console.log('pager', first, first + rows)
        // setResults(products.slice(first, first + rows))
        // console.log(results)
    }

    // const onPageChange = (e, index) => {
    //     console.log('e', e)

    //     if (e.page !== currentPage) {
    //         setCurrentPage(e.page)
    //         setFirst(e.first)
    //         setRows(e.rows)
    //         handleSearch()
    //     } else {
    //         console.log('mesma pagina')
    //     }
    //     console.log('page', currentPage, e.page)

    // }

    const handleChange = () => {
        setSearchTerm(inputRef.current.value.trim())
        console.log('value is:', inputRef.current.value)
        // set the const products with the filtered values
        handleSearch()
    }

    const onPage = (event) => {
        console.log('event', event)
        setFirst(event.first)
    }

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <form className="row m-0">
                    <div className="form-group">
                        <input type="search" className='form-control' name="search" ref={inputRef}
                            onKeyUp={() => {
                                handleChange()
                            }}
                        />
                    </div>
                </form>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        )
    }

    const paginatorLeft = () => {
        return (
            <div>{results.length} Resultados</div>
        )
    }

    const dropDownChange = (e) => {
        // setRows(e.value >= products.length ? 1 : e.value)
        console.log(products.length, e.value)
        setFirst(0)
        setRows(e.value)
        setTotalRecords(e.value)
        //setLinkSize(e.value === products.length ? 1 : 5)
        setResults(products.slice(0, 0 + e.value))

        //setRows(1)
        console.log('rows', rows)


        //console.log(e)
    }

    const paginatorRight = () => {
        return (
            <Dropdown value={rows} options={dropdownOptions} onChange={dropDownChange} />
        )
    }

    return (
        <>
            {
                console.log('total', totalRecords, 'rows', rows, 'results', results, 'first', first)
            }
            <div className="card">
                <DataView
                    first={first}
                    value={results}
                    itemTemplate={itemTemplate}
                    layout={layout}
                    header={header()}
                    rows={5}
                    paginatorPosition="bottom"
                    onPage={(event) => {
                        onPage(event)
                    }}
                    paginator
                    paginatorLeft={paginatorLeft}
                    paginatorRight={paginatorRight}
                    pageLinkSize={linkSize}
                    totalRecords={totalRecords}
                />
            </div>
            <style>
                {`
                    input[type="search"]::-webkit-search-decoration,
                    input[type="search"]::-webkit-search-cancel-button,
                    input[type="search"]::-webkit-search-results-button,
                    input[type="search"]::-webkit-search-results-decoration {
                    -webkit-appearance:none;
                    }
                `}
            </style>
        </>
    )
}
