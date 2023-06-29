import React from 'react'
import { Dropdown } from "primereact/dropdown"

/**
 * Dataview header sort button
 * 
 * @param {Object} sorts 
 * @param {String} sortKey 
 * @param {Function} onSortChange 
 * 
 * @returns {JSX.Element}
 */
const sortButton = (sorts, sortKey, onSortChange) => {
    // console.log('sortOptions', sortOptions, 'sortKey', sortKey, 'onSortChange', onSortChange)

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
        <div className="flex">
            <Dropdown
                options={getOptions(sorts.sortOptions)}
                value={sortKey}
                className={sorts?.className || 'w-full sm:w-14rem'}
                style={sorts?.style || {}}
                placeholder={sorts?.placeholder || 'Orderder resultados'}
                optionLabel={sorts?.optionLabel || 'label'}
                onChange={(e) => {
                    const actualState = getState(e.value, sorts.sortOptions)
                    onSortChange({
                        sortField: actualState.sorts.sortField,
                        sortOrder: actualState.sorts.sortOrder,
                        sortKey: e.value
                    })
                }}
            />
        </div>
    )
}

export default sortButton