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

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

const layoutButton = (layout, callback) => {
    return (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => callback(e.value)} />
        </div>
    )
}

const searchBar = (loading, globalFilterValue, onGlobalFilterChange) => {
    return (
        <div className='flex'>
            <div className='flex me-1'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText disabled={loading} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Pesquise por qualquer campo...'
                        style={{
                            minWidth: '300px'
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

const header = (title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange) => {
    return (
        <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
            <h4 className="m-0">{ title }</h4>
            {
                searchBar(loading, globalFilterValue, onGlobalFilterChange)
            }
            {
                layout !== 'table' ? layoutButton(layout, onChangeLayout) : ''
            }
        </div>
    )
}

export {
    header
}