import { DataviewRequest } from "../controller"

/**
 * Object configuration of Dataview component
 */
class DataviewOptions {
    /**
     * @param {Object} options 
     * 
     * @param {String} options.type default: table
     * @param {String|Boolean} options.title default: false
     * 
     * @param {Object} options.pagination
     * @param {Number} options.pagination.page default:0
     * @param {Number} options.pagination.peerPage default: 5
     * @param {Number[]} options.pagination.peerPageOptions default: array (5,10,20,30)
     * 
     * @param {{value: String, operator: Object, 
     * matchMode: String, constraints: {
     * value: String, matchMode: String
     * }}[]} options.filters primereact api filters
     * 
     * @param {Object} options.sorts
     * @param {String|null} options.sorts.sortField default: null
     * @param {Number|null} options.sorts.sortOrder 1 = ascending, -1 = descending, default: 1
     * 
     * @param {Object} options.templates
     * @param {{header: String, field: String, 
     * sortable: Boolean, sortField: String,
     * filter: Boolean, filterField: String, 
     * filterElement: Function, body: Function}[]} options.templates.columns columns template
     * @param {Function} options.templates.grid grid template
     * @param {Function} options.templates.list list template
     * 
     * @param {DataviewRequest} options.onRequest callback to execute when component requests
     * @param {Function} options.onPageChange callback to execute when the page change
     * @param {Function} options.onSortChange callback to execute when the sort change
     * @param {Function} options.onFilterChange callback to execute when the filter change
     * 
     * @param {Boolean} options.build flag
     */
    constructor(options) {
        this.type = options.type
        this.title = options.title
        this.pagination = options.pagination
        this.sorts = options.sorts
        this.filters = options.filters
        this.templates = options.templates
        this.onRequest = options.onRequest
        this.onPageChange = options.onPageChange
        this.onSortChange = options.onSortChange
        this.onFilterChange = options.onFilterChange
        this.build = true
    }

}

export default DataviewOptions