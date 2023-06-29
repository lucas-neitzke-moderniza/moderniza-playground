import { Exception } from "sass"
import { DataviewRequest } from "../controller"

/**
 * Configuration of Dataview
 */
class DataviewOptions {
    /**
     * @param {Object} options 
     * @param {String} options.type default: 'table'
     * @param {String|Boolean} options.title default: false
     * 
     * @param {Object} options.pagination
     * @param {Number} options.pagination.page default:0
     * @param {Number} options.pagination.peerPage default: 5
     * @param {Number[]} options.pagination.peerPageOptions default: array (5,10,20,30)
     * 
     * @param {{value: String|Null, operator: Object, matchMode: String, constraints: {
     * value: String|Null, matchMode: String}}[]} options.filters primereact datatable api filters
     * 
     * @param {Object} options.sorts
     * @param {String|Null} options.sorts.sortField default: Null
     * @param {Number|Null} options.sorts.sortOrder 1 = ascending, -1 = descending, default: 1
     * @param {String} options.sorts.placeholder sort dropdown placeholder
     * @param {String} options.sorts.optionLabel sort dropdown optionLabel
     * @param {String} options.sorts.className sort dropdown className
     * @param {Object} options.sorts.style sort dropdown style
     * @param {{label: String, value: Any, sorts: {sortOrder: Number, sortField: String}}[]} options.sorts.sortOptions
     * 
     * @param {Object} options.templates
     * @param {{header: String, field: String, sortable: Boolean, sortField: String,
     * filter: Boolean, filterField: String, filterElement: Function, 
     * body: Function}[]} options.templates.columns columns template
     * @param {Function} options.templates.grid grid template
     * @param {Function} options.templates.list list template
     * 
     * @param {{xs: String, sm: String, lg: String, xl: String, xxl:String}} options.responsive
     * 
     * @param {Object} options.export
     * @param {String} options.export.type custom export button type
     * @param {String} options.export.size custom export button size
     * @param {String} options.export.severity custom export button severity
     * @param {String} options.export.icon custom export button icon
     * @param {String} options.export.label custom export button label
     * @param {String[]} options.export.extensions extensions to export, supported: ('xlsx', 'pdf', 'csv')
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.xlsx custom xlsx export button
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.pdf custom pdf export button
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.csv custom csv export button
     * 
     * @param {DataviewRequest} options.onRequest callback to execute when component requests
     * @param {Function} options.onPageChange callback to execute when the page change
     * @param {Function} options.onSortChange callback to execute when the sort change
     * @param {Function} options.onFilterChange callback to execute when the filter change
     * 
     * @param {Boolean} options.build flag
     */
    constructor(options) {
        try {
            if (this.validate(options)) {
                // *CONFIG
                this.type = options.type
                this.title = options.title
                this.pagination = options.pagination
                this.sorts = options.sorts
                this.filters = options.filters
                this.templates = options.templates
                this.responsive = options.responsive
                this.export = options.export
                // *CALLBACKS
                this.onRequest = options.onRequest
                this.onPageChange = options.onPageChange
                this.onSortChange = options.onSortChange
                this.onFilterChange = options.onFilterChange
                // ?FLAG: to do some verifications
                this.build = true
            }
        } catch (e) {
            /**
             * @type {Error}
             */
            const error = e
            throw new Error(`Dataview Error: ${error.message}`)
        }
    }

    /**
     * Validate Dataview options
     * 
     * @param {*} options 
     * @returns {Boolean}
     */
    validate(options) {

        console.log('options', options)
        const supportedLayouts = ['grid', 'list', 'table']

        // *title
        if (typeof options.title !== 'string') {
            throw new Error('[options.title] must be typeof string')
        }

        // *type
        if (typeof options.type !== 'string') {
            throw new Error('[options.type] must be typeof string')
        }

        // *type with supports
        if (!supportedLayouts.includes(options.type)) {
            throw new Error(`[options.type] must be one of: ${supportedLayouts.join(', ').trim()}`)
        }

        // *templates
        if (typeof options.templates !== 'object') {
            throw new Error('[options.templates] must be typeof object')
        }

        // *templates.columns
        if (!(options.templates.columns instanceof Array)) {
            throw new Error('[options.templates.columns] must be typeof array')
        }

        // *templates.grid
        if (typeof options.templates.grid !== 'function') {
            throw new Error('[options.templates.grid] must be typeof function')
        }

        // *templates.list
        if (typeof options.templates.list !== 'function') {
            throw new Error('[options.templates.list] must be typeof function')
        }

        // *pagination
        if (typeof options.pagination !== 'object') {
            throw new Error('[options.pagination] must be typeof object')
        }

        // *pagination.page
        if (typeof options.pagination.page !== 'number') {
            throw new Error('[options.pagination.page] must be typeof number')
        }

        // *pagination.peerPage
        if (typeof options.pagination.peerPage !== 'number') {
            throw new Error('[options.pagination.peerPage] must be typeof number')
        }

        // *pagination.peerPageOptions
        if (!(options.pagination.peerPageOptions instanceof Array)) {
            throw new Error('[options.pagination.peerPageOptions] must be typeof array')
        }

        // *pagination.peerPageOptions each value
        options.pagination.peerPageOptions.forEach((value) => {
            if (typeof value !== 'number') {
                throw new Error('[options.pagination.peerPageOptions] each value must be typeof number')
            }
        })

        // *filters
        if (typeof options.pagination !== 'object') {
            throw new Error('[options.filters] must be typeof object')
        }

        // *filters.filter
        const filtersKeys = Object.keys(options.filters)
        // console.log('keys', filtersKeys)
        filtersKeys.map((key) => {
            const filter = options.filters[key]
            console.log('filter', filter)

            // *filters.value
            if (filter.value) {
                if (typeof filter.value !== 'string') {
                    throw new Error('[options.filters.value] must be typeof string')
                }
            }

            // *filters.matchMode
            if (filter.matchMode) {
                if (typeof filter.matchMode !== 'string') {
                    throw new Error('[options.filters.matchMode] must be typeof string')
                }
            }

            // *filters.filter.operator
            if (filter.operator) {
                if (typeof filter.operator !== 'string') {
                    throw new Error('[options.filters.operator] must be typeof string')
                }
            }

            // *filters.filter.constraints
            if (filter.constraints) {
                if (!(filter.constraints instanceof Array)) {
                    throw new Error('[options.filters.constraints] must be typeof array')
                }
            }

            // *filters.filter.constraints[item]
            if (filter.constraints) {
                filter.constraints.forEach((constraint) => {

                    // *filters.filter.constraints[item].value
                    if (constraint.value) {
                        if (typeof constraint.value !== 'string') {
                            throw new Error('[options.filters.constraints.value] must be typeof string')
                        }
                    }
    
                    // *filters.filter.constraints[item].matchMode
                    if (constraint.matchMode) {
                        if (typeof constraint.matchMode !== 'string') {
                            throw new Error('[options.filters.constraints.matchMode] must be typeof string')
                        }
                    }
                })
            }
        })

        // *sorts

        return true

    }

}

export default DataviewOptions