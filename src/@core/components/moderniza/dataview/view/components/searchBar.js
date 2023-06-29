import React from 'react'
import { InputText } from "primereact/inputtext"

/**
 * Dataview header search bar
 * 
 * @param {Boolean} loading 
 * @param {String} globalFilterValue 
 * @param {Function} onGlobalFilterChange 
 * 
 * @returns {JSX.Element}
 */
const searchBar = (loading, globalFilterValue, onGlobalFilterChange) => {
    return (
        <div className='flex'>
            <div className='flex me-1'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        disabled={loading}
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder='Pesquise por qualquer campo...'
                        style={{
                            minWidth: '300px'
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

export default searchBar