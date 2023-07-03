import React from 'react'
import { DataViewLayoutOptions } from 'primereact/dataview'

/**
 * Dataview header layout button 
 * 
 * @param {String} layout 
 * @param {Function} callback 
 * 
 * @returns {JSX.Element}
 */
const layoutButton = (layout, callback) => {
    return (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} className="dataview-custom-layout-button" onChange={(e) => callback(e.value)} />
        </div>
    )
}

export default layoutButton