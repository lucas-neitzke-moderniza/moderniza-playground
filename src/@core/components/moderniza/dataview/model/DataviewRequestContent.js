class DataviewRequestContent {
    /**
     * 
     * @param {Object} options 
     * @param {Array} options.content
     * @param {Int} options.total
     */
    constructor(options) {
        this.content = options.content
        this.total = options.total
        this.build = true
    }
}

export default DataviewRequestContent