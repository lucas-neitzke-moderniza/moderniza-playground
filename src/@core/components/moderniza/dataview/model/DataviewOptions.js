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
     * @param {{label: String, value: Any, sortOrder: Number, sortField: String}[]} options.sorts.sortOptions
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
     * 
     * @param {String[]} options.export.extensions extensions to export, supported: ('xlsx', 'pdf', 'csv')
     * 
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

            // TODO: Fazer validações
            // throw new Exception()...

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
        } catch (error) {
            /**
             * @type {Exception}
            */
            const e = error
            throw new Exception(e.message)
        }
    }

}

export default DataviewOptions