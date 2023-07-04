/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Button } from "primereact/button"

/**
 * Dataview header layout button 
 * 
 * @param {String} layout 
 * @param {Function} callback 
 * 
 * @returns {JSX.Element}
 */
const layoutButton = (layout, callback) => {

    const items = [
        { icon: 'pi pi-th-large', value: 'grid' },
        { icon: 'pi pi-bars', value: 'list' },
        { icon: 'pi pi-table', value: 'table' }
    ]

    return (
        <div class="flex m-auto">
            <div className="p-buttonset">
                {
                    items.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                size='small'
                                severity="primary"
                                icon={item.icon}
                                outlined={item.value !== layout}
                                onClick={() => callback(item.value)}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default layoutButton