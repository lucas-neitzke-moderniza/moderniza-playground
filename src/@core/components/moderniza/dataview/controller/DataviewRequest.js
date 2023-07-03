import { DataviewRequestEvent, DataviewRequestContent } from "../model"

/**
 * Function that requests a async callback with state as parameter
 * used as onRequest oeverride callback
 * 
 * @async
 * @param {Function} callback function that requests
 * @param {DataviewRequestEvent} state current state
 * @returns {Promise<DataviewRequestContent>}
 */
const DataviewRequest = async (callback, state) => {
    const response = await callback(state)
    return new DataviewRequestContent(response)
}

export default DataviewRequest