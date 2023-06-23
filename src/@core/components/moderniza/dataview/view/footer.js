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

import paginatorLeft from './paginatorLeft'
import paginatorRight from './paginatorRight'

import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'   // theme
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'

const footer = (first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback) => {
    return (
        <>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                rightContent={paginatorRight(rows, peerPageOptions, onChangePeerPageCallback)}
                leftContent={paginatorLeft(totalRecords)}
            />
        </>
    )
}

export {
    footer
}