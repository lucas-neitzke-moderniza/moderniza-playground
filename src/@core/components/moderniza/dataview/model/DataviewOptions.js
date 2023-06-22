import { DataviewRequest } from "../controller"

class DataviewOptions {
    /**
     * Objeto de configuração do Dataview
     * 
     * @param {Object} options 
     * @param {String} options.type
     * @param {String} options.title
     * @param {Object} options.pagination
     * @param {Object} options.filters
     * @param {Object} options.templates
     * 
     * @param {{header: String, field: String, 
     * sortable: Boolean, sortField: String,
     * filter: Boolean, filterField: String, filterElement: Function, body: Function}[]} options.templates.columns
     * 
     * @param {Function} options.templates.grid
     * @param {Function} options.templates.list
     * @param {DataviewRequest} options.onRequest
     * @param {Function} options.onPageChange
     * @param {Function} options.onSortChange
     * @param {Function} options.onFilterChange
     */
    constructor(options) {
        this.type = options.type
        this.title = options.title
        this.pagination = options.pagination
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