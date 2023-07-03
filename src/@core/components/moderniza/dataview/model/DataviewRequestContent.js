/**
 * onRequest return
 */
class DataviewRequestContent {
    /**
     * 
     * @param {Object} options 
     * @param {Array} options.content
     * @param {Number} options.total flag
     */
    constructor(options) {
        this.content = options.content
        this.total = options.total
        this.build = true
    }
}

export default DataviewRequestContent