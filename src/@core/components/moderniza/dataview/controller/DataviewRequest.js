import { DataviewRequestEvent, DataviewRequestContent } from "../model"

/**
 * Function that requests a async callback with state as parameter
 * 
 * @param {Function} callback function that requests
 * @param {DataviewRequestEvent} state current state
 * @returns {DataviewRequestContent}
 */
const DataviewRequest = async (callback, state) => {
    return await callback(state)
}

export default DataviewRequest