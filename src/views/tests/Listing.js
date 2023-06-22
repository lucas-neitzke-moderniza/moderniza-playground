// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Listing App Component Imports
import Listing from '../../@core/components/listing'
// import Sidebar from './Sidebar'

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

    return (
        <Fragment>
            <div className='content-right'>
                <div className='content-body'>
                    <Listing data={products} template={template} />
                </div>
            </div>
        </Fragment>
    )
}

export default testListing
