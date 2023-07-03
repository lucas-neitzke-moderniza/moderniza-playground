
/**
 * Event emmited onRequest
 */
class DataviewRequestEvent {

    /**
     * @param {Object} options
     * 
     * @param {Object} options.pagination
     * @param {Number} options.pagination.page default:0
     * @param {Number} options.pagination.peerPage default: 5
     * 
     * @param {{value: String, operator: Object, matchMode: String, constraints: {
     * value: String, matchMode: String}}[]} options.filters primereact api filters
     * 
     * @param {Object} options.sorts
     * @param {String|null} options.sorts.sortField default: null
     * @param {Number|null} options.sorts.sortOrder 1 = ascending, -1 = descending, default: 1
     */
    constructor(options) {
        this.pagination = options.pagination
        this.filters = options.filters
        this.sorts = options.sorts
    }
}

export default DataviewRequestEvent