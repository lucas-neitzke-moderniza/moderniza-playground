/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Dropdown } from "primereact/dropdown"
import { DataviewDeviceSize } from '../../controller'

/**
 * Dataview header sort button
 * 
 * @param {Object} sorts 
 * @param {String} sortKey 
 * @param {Function} onSortChange 
 * 
 * @returns {JSX.Element}
 */
const sortButton = (sorts, sortKey, onSortChange, deviceSize) => {

    console.log('device sort', deviceSize)

    const getLabel = (value) => {
        if (deviceSize.width <= 480) {
            return 'Ordenar'
        } else {
            return value
        }
    }

    /**
     * 
     * @param {*} value 
     * @param {Array} sortOptions 
     */
    const getState = (value, sortOptions) => {
        const sortTest = sortOptions.filter((item) => {
            return item.value === value
        })[0]
        // console.log('sortTest', sortTest)
        return sortTest
    }

    const getOptions = (_options) => {
        const options = []
        _options.forEach((item) => {
            options.push({
                label: item.label,
                value: item.value
            })
        })
        return options
    }

    return (
        <>
            <Dropdown
                options={getOptions(sorts.sortOptions)}
                value={sortKey}
                placeholder={getLabel(sorts?.placeholder)}
                optionLabel={sorts?.optionLabel}
                className={sorts?.className}
                style={sorts?.style}
                onChange={(e) => {
                    const actualState = getState(e.value, sorts.sortOptions)
                    onSortChange({
                        sortField: actualState.sorts.sortField,
                        sortOrder: actualState.sorts.sortOrder,
                        sortKey: e.value
                    })
                }}
            />
        </>
    )
}

export default sortButton