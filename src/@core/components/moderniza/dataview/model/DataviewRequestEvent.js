
class DataviewRequestEvent {

    /**
     * @param {Object} options
     * @param {Object} options.pagination
     * @param {Object} options.filters
     * @param {Object} options.sorts
     * @param {String} options.sorts.sortField
     * @param {Number} options.sorts.sortOrder
     */
    constructor(options) {
        this.pagination = options.pagination
        this.filters = options.filters
        this.sorts = options.sorts
    }
}

export default DataviewRequestEvent