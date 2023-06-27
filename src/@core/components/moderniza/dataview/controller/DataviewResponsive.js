/* eslint-disable no-unused-vars */

/**
 * Change the layout when vieport changes
 * @param {Function} callback 
 * @param {String} currentLayout 
 * @param {{width: Number, height: Number}} deviceSize 
 * @param {{xs: String, sm: String, lg: String, xl: String, xxl:String}} optionsResponsive
 * @returns {String}
 */
const DataviewResponsive = (callback, currentLayout, deviceSize, optionsResponsive) => {

    console.log('deviceSize', deviceSize)
    console.log('optionsResponsive', optionsResponsive)

    /**
     * @param {String} current 
     * @param {String} actual 
     * @returns {String}
     */
    const fromDefault = (current, actual) => {
        console.log('current', current, 'actual', actual)
        return current !== actual ? actual : current
    }

    if (deviceSize.width > 0 && deviceSize.width < 576) {
        console.log('size xs')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.xs
        ))
    } else if (deviceSize.width > 576 && deviceSize.width < 768) {
        console.log('size sm')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.sm
        ))
    } else if (deviceSize.width > 768 && deviceSize.width < 992) {
        console.log('size md')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.md
        ))
    } else if (deviceSize.width > 992 && deviceSize.width < 1200) {
        console.log('size lg')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.lg
        ))
    } else if (deviceSize.width > 1200 && deviceSize.width < 1400) {
        console.log('size xl')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.xl
        ))
    } else {
        console.log('size xxl')
        callback(fromDefault(
            currentLayout,
            optionsResponsive?.xxl
        ))
    }
}


export default DataviewResponsive