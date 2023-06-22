import { DataviewRequestEvent, DataviewRequestContent } from "../model"

/**
 * Request from options
 * @param {Function} callback 
 * @param {DataviewRequestEvent} state 
 * @returns {DataviewRequestContent}
 */
const DataviewRequest = async (callback, state) => {
    return await callback(state)
}

export default DataviewRequest