/**
 * Return of 'onRequest'
 */
class DataviewRequestContent {
    /**
     * 
     * @param {Object} options 
     * @param {Array} options.content
     * @param {Int} options.total flag
     */
    constructor(options) {
        this.content = options.content
        this.total = options.total
        this.build = true
    }
}

export default DataviewRequestContent