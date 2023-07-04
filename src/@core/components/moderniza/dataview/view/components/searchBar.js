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
        <div className='flex flex-grow-1 me-0 me-lg-1'>
            <div className='flex flex-grow-1'>
                <span className="p-input-icon-left"
                    style={{
                        width: '100%'
                    }}>
                    <i className="pi pi-search" />
                    <InputText
                        disabled={loading}
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder='Pesquise por qualquer campo...'
                        style={{
                            width: '100%'
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

export default searchBar