/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { ProductService } from '../listing/service/ProductService'
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Rating } from 'primereact/rating'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { InputText } from 'primereact/inputtext'
import { Paginator } from 'primereact/paginator'
import { OverlayPanel } from 'primereact/overlaypanel'

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

export default function BasicDemo(props) {
    const [data] = useState(props.data)
    const [products, setProducts] = useState([])
    const [results, setResults] = useState([])
    const [layout, setLayout] = useState('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedResults, setSearchedResults] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState(0)
    const [sortField, setSortField] = useState('')
    const op = useRef(null)
    const sortOptions = [
        { label: 'Maior preço', value: '!price' },
        { label: 'Menor preço', value: 'price' }
    ]

    const [dropdownOptions] = useState([
        { label: 2, value: 2 },
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 'All', value: totalRecords }
    ])

    const onSortChange = (event) => {
        const value = event.value

        if (value.indexOf('!') === 0) {
            setSortOrder(-1)
            setSortField(value.substring(1, value.length))
            setSortKey(value)
        } else {
            setSortOrder(1)
            setSortField(value)
            setSortKey(value)
        }
    }

    useEffect(() => {

        ProductService.getProducts().then((data) => {
            setProducts(data)
            setResults(data.slice(0, rows))
            setTotalRecords(data.length)
        })

    }, [])

    const handdleTerm = () => {
        console.log('dropdown', dropdownOptions)

        if (searchTerm !== '') {

            console.log('products', products)

            const _results = []

            products.filter(product => {
                if (product.name.toLowerCase().includes(searchTerm)) {
                    _results.push(product)
                }
                //console.log(product.name.toLowerCase().includes(searchTerm))
                // return product.name.toLowerCase().includes(searchTerm)
            }).slice(first, first + rows)

            setResults(_results)

            // * Only paginate the results if results > 20

            if (_results.length <= 5) {
                setRows(5)
                setTotalRecords(_results.length < 5 ? _results.length : 5)
            } else if (_results.length > 5 && _results.length < 10) {
                setRows(10)
                setTotalRecords(_results.length < 10 ? _results.length : 10)
            } else if (_results.length > 10 && _results.length < 20) {
                setRows(20)
                setTotalRecords(_results.length < 20 ? _results.length : 20)
            } else if (_results.length > 20) {
                setRows(_results.length)
                setTotalRecords(_results.length)
            } else {
                setTotalRecords(_results.length)
                setResults(_results.slice(first, first + rows))
                setRows(5)
            }

            console.log('used filtered')
            console.log('results', _results)
            // setSearchedResults(_results)

        } else {
            console.log('used normal')
            console.log(products)
            console.log(products.slice(first, first + rows))
            setResults(products.slice(first, first + rows))
            setTotalRecords(products.length)
        }
    }

    useEffect(() => {
        handdleTerm()
    }, [first, rows, searchTerm])

    useEffect(() => {
        // * Set the 'All' option with the totalRecords
        dropdownOptions.map((item) => {

            if (item.label === 'All') {
                item.value = totalRecords
            }
            // } else {
            //     item.label = item.value
            // }

            item.disabled = false
            return item
        })
        // *Set the disabled as true if the dropdown option is selected and search term is empty
        dropdownOptions.map((item) => {
            if ((item.value !== totalRecords || item.value === totalRecords) && searchTerm !== '') {
                item.disabled = true
            }
            //console.log('aaa', (item.value !== totalRecords || item.value === totalRecords) && searchTerm !== '', item)
            return item
        })
    }, [totalRecords])

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
                        <div className="flex sm:flex-column align-items-center sm:align-items-end ">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" d
                                isabled={product.inventoryStatus === 'OUTOFSTOCK'}
                                onClick={(e) => op.current.toggle(e)}
                            ></Button>
                            <OverlayPanel ref={op}>
                                <div className="flex flex-column align-items-center">
                                    <Button label="Comprar Agora" size='small' rounded severity='primary' className="mb-1"
                                        style={{ width: '190px' }} />
                                    <Button label="Adicionar ao Carrinho" size='small' rounded severity='info'
                                        style={{ width: '190px' }} />
                                </div>
                            </OverlayPanel>
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
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" d
                            isabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            onClick={(e) => op.current.toggle(e)}
                        ></Button>
                        <OverlayPanel ref={op}>
                            <div className="flex flex-column align-items-center">
                                <Button label="Comprar Agora" size='small' rounded severity='primary' className="mb-1"
                                    style={{ width: '190px' }} />
                                <Button label="Adicionar ao Carrinho" size='small' rounded severity='info'
                                    style={{ width: '190px' }} />
                            </div>
                        </OverlayPanel>
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

    const onPageChange = (e, index) => {
        if (e.page !== currentPage) {
            setCurrentPage(e.page)
            setFirst(e.first)
            setRows(e.rows)
        }
    }

    const header = () => {
        return (
            <div className="flex justify-content-start">
                {/* <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                    <h4 className="m-0">Customers</h4>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                </div> */}

                <div className='flex flex-grow-1 my-auto'>
                    <h4 className="m-0">Produtos</h4>
                </div>

                <div className="flex flex-wrap gap-2 align-items-center justify-content-end" >

                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            className="form-control"
                            style={{
                                minWidth: '300px'
                            }}
                            value={searchTerm}
                            placeholder='Pesquise pelo nome do produto...'
                            onInput={(e) => {
                                setFirst(0)
                                setSearchTerm(e.target.value.trim())
                            }} />
                    </span>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Orderder por preço" onChange={onSortChange} className="w-full sm:w-14rem" />
                    <div className='flex my-auto'>
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                    </div>
                    <Button severity='primary' size='small' icon="pi pi-plus" label="Novo" />
                </div>
            </div>
        )
    }

    const emptyMessage = () => {
        return (
            <>
                <div className="alert alert-primary">
                    <p className="p-2">Nenhum registro encontrado</p>
                </div>
            </>
        )
    }

    const paginatorLeft = () => {
        return (
            <div>{totalRecords} Resultados</div>
        )
    }

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

    return (
        <>
            {
                console.log('total', totalRecords, 'rows', rows, 'first', first, 'results', results, 'term', searchTerm)
            }
            <div className="card">
                <DataView
                    className='mdz-dataview-component'
                    value={results}
                    itemTemplate={itemTemplate}
                    layout={layout}
                    header={header()}
                    rows={rows}
                    paginatorPosition="bottom"
                    onPage={(event) => setFirst(event.first)}
                    emptyMessage={emptyMessage()}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    lazy={true}
                    footer={footer()}
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
