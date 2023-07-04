/* eslint-disable no-unused-vars */
import { DataviewRequest } from "../controller"

/**
 * Dataview configuration
 */
class DataviewOptions {
    /**
     * @param {Object} options 
     * @param {String} options.type default: 'table'
     * @param {String} options.height sets the component height
     * @param {String|Boolean} options.title default: false
     * 
     * @param {Object} options.pagination
     * @param {Number} options.pagination.page default:0
     * @param {Number} options.pagination.peerPage default: 5
     * @param {Number[]} options.pagination.peerPageOptions default: array (5,10,20,30)
     * 
     * @param {{value: String|Null, operator: Object, matchMode: String, constraints: {
     * value: String|Null, matchMode: String}}[]} options.filters primereact datatable api filters
     * 
     * @param {Object} options.sorts
     * @param {Boolean} options.sorts.visible
     * @param {String|Null} options.sorts.sortField default: Null
     * @param {Number|Null} options.sorts.sortOrder 1 = ascending, -1 = descending, default: 1
     * @param {String} options.sorts.placeholder sort dropdown placeholder
     * @param {String} options.sorts.optionLabel sort dropdown optionLabel
     * @param {String} options.sorts.className sort dropdown className
     * @param {Object} options.sorts.style sort dropdown style
     * @param {{label: String, value: Any, sorts: {sortOrder: Number, sortField: String}}[]} options.sorts.sortOptions
     * 
     * @param {Object} options.templates
     * @param {{header: String, field: String, sortable: Boolean, sortField: String,
     * filter: Boolean, filterField: String, filterElement: Function, 
     * body: Function}[]} options.templates.columns columns template
     * @param {Function} options.templates.grid grid template
     * @param {Function} options.templates.list list template
     * 
     * @param {{xs: String, sm: String, lg: String, xl: String, xxl:String}} options.responsive
     * 
     * @param {{label:String, icon: String, severity: String, className: String, style: Object, onClick: Function, visible: Boolean, size: String}} options.add Add header button
     * 
     * @param {Object} options.export
     * @param {Boolean} options.visible
     * @param {String} options.export.type custom export button type
     * @param {String} options.export.size custom export button size
     * @param {String} options.export.severity custom export button severity
     * @param {String} options.export.icon custom export button icon
     * @param {String} options.export.label custom export button label
     * @param {String[]} options.export.extensions extensions to export, supported: ('xlsx', 'pdf', 'csv')
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.xlsx custom xlsx export button
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.pdf custom pdf export button
     * @param {{type: String, className: String, size: String, severity: String, label: String, 
     * icon: String, style: String}} options.export.csv custom csv export button
     * 
     * @param {DataviewRequest} options.onRequest callback to execute when component requests
     * @param {Function} options.onPageChange callback to execute when the page change
     * @param {Function} options.onSortChange callback to execute when the sort change
     * @param {Function} options.onFilterChange callback to execute when the filter change
     * 
     * @param {Boolean} options.build flag
     */
    constructor(options) {
        try {
            if (this.validate(options)) this.dispatch(options)
        } catch (e) {
            /**
             * @type {Error}
             */
            const error = e
            console.table(error)
            throw new Error(error.message)
        }
    }

    /**
     * Validate Dataview options
     * 
     * @param {DataviewOptions} options 
     * @returns {Boolean}
     */
    validate(options) {
        // console.log('options', options)
        const supportedLayouts = ['grid', 'list', 'table']
        const supportedExtensions = ['csv', 'xlsx', 'pdf']

        // ?title (optional)
        if (options.title) {
            if (typeof options.title !== 'string') {
                throw new Error('[options.title] must be typeof string')
            }
        }
        // !type (required)
        if (typeof options.type !== 'string') {
            throw new Error('[options.type] must be typeof string')
        }
        // !type with supports (required)
        if (!supportedLayouts.includes(options.type)) {
            throw new Error(`[options.type] must be one of: ${supportedLayouts.join(', ').trim()}`)
        }
        // !pagination (required)
        if (typeof options.pagination !== 'object') {
            throw new Error('[options.pagination] must be typeof object')
        }
        // !pagination.page (required)
        if (typeof options.pagination.page !== 'number') {
            throw new Error('[options.pagination.page] must be typeof number')
        }
        // !pagination.peerPage (required)
        if (typeof options.pagination.peerPage !== 'number') {
            throw new Error('[options.pagination.peerPage] must be typeof number')
        }
        // ?pagination.height (optional)
        if (options.pagination.height) {
            if (typeof options.pagination.height !== 'string') {
                throw new Error('[options.pagination.height] must be typeof string')
            }
        }
        // ?pagination.peerPageOptions (optional)
        if (options.pagination.peerPageOptions) {
            if (!(options.pagination.peerPageOptions instanceof Array)) {
                throw new Error('[options.pagination.peerPageOptions] must be typeof array')
            }
            // *pagination.peerPageOptions[]
            options.pagination.peerPageOptions.forEach((value) => {
                if (typeof value !== 'number') {
                    throw new Error('[options.pagination.peerPageOptions] each value must be typeof number')
                }
            })
        }
        // ?filters (optional)
        if (options.filters) {
            // *filters
            if (typeof options.filters !== 'object') {
                throw new Error('[options.filters] must be typeof object')
            }
            // *filters.filter
            Object.keys(options.filters).map((key, index) => {
                const filter = options.filters[key]

                // ?filters.value (value+matchMode) (optional)
                if (filter.value && filter.matchMode) {
                    if (typeof filter.value !== 'string') {
                        throw new Error(`[options.filters[${index}].value] must be typeof string`)
                    }

                    if (!(typeof filter.matchMode === 'string' || typeof filter.matchMode === 'function')) {
                        throw new Error(`[options.filters[${index}].matchMode] must be typeof string`)
                    }
                } else if (filter.constraints && filter.operator) {
                    // ?filters.filter.operator (operator+constraints)(optional)
                    if (typeof filter.operator !== 'string') {
                        throw new Error(`[options.filters[${index}].operator] must be typeof string`)
                    }
                    if (!(filter.constraints instanceof Array)) {
                        throw new Error(`[options.filters[${index}].constraints] must be typeof array`)
                    }
                    // *filters.filter.constraints[]
                    filter.constraints.forEach((constraint) => {
                        // *filters.filter.constraints[item].value
                        if (constraint.value) {
                            if (typeof constraint.value !== 'string') {
                                throw new Error(`[options.filters[${index}].constraints.value] must be typeof string`)
                            }
                        }
                        // *filters.filter.constraints[item].matchMode
                        if (constraint.matchMode) {
                            if (typeof constraint.matchMode !== 'string') {
                                throw new Error(`[options.filters[${index}].constraints.matchMode] must be typeof string`)
                            }
                        }
                    })
                } else {
                    throw new Error(`[options.filters[${index}]] unknow filter combination
                     (supported: {operator,constraints} or {value,matchMode})`)
                }
            })
        }

        // ?sorts (optional)
        if (options.sorts) {
            // *sorts
            if (typeof options.sorts !== 'object') {
                throw new Error('[options.sorts] must be typeof object')
            }
            // !sorts[].sortField (required)
            if (typeof options.sorts.sortField !== 'string') {
                throw new Error('[options.sorts.sortField] must be typeof string')
            }
            // !sorts[].sortOrder (required)
            if (typeof options.sorts.sortOrder !== 'number') {
                throw new Error('[options.sorts.sortOrder] must be typeof number')
            }
            // ?sorts[].placeholder (optional)
            if (options.sorts.placeholder) {
                if (typeof options.sorts.placeholder !== 'string') {
                    throw new Error('[options.sorts.placeholder] must be typeof string')
                }
            }
            // ?sorts[].optionLabel (optional)
            if (options.sorts.optionLabel) {
                if (typeof options.sorts.optionLabel !== 'string') {
                    throw new Error('[options.sorts.optionLabel] must be typeof string')
                }
            }
            // ?sorts[].className (optional)
            if (options.sorts.className) {
                if (typeof options.sorts.className !== 'string') {
                    throw new Error('[options.sorts.className] must be typeof string')
                }
            }
            // ?sorts[].style (optional)
            if (options.sorts.style) {
                if (typeof options.sorts.style !== 'object') {
                    throw new Error('[options.sorts.style] must be typeof object')
                }
            }
            // ?sorts[].sortOptions (optional)
            if (options.sorts.sortOptions) {
                if (!(options.sorts.sortOptions instanceof Array)) {
                    throw new Error('[options.sorts.sortOptions] must be typeof array')
                }
                // *sorts[].sortOptions[]
                options.sorts.sortOptions.forEach((sortOption, index) => {
                    // !sorts[].sortOptions[].label (required)
                    if (typeof sortOption.label !== 'string') {
                        throw new Error(`[options.sorts.sortOptions[${index}].label] must be typeof string`)
                    }
                    // !sorts[].sortOptions[].value (required)
                    if (typeof sortOption.value !== 'string') {
                        throw new Error(`[options.sorts.sortOptions[${index}].value] must be typeof string`)
                    }
                    // !sorts[].sortOptions[].sorts.sortOrder (required)
                    if (typeof sortOption.sorts.sortOrder !== 'number') {
                        throw new Error(`[options.sorts.sortOptions[${index}].sorts.sortOrder] must be typeof number`)
                    }
                    // !sorts[].sortOptions[].sorts.sortField (required)
                    if (typeof sortOption.sorts.sortField !== 'string') {
                        throw new Error(`[options.sorts.sortOptions[${index}].sorts.sortField] must be typeof string`)
                    }
                })
            }
        }

        // !templates (required)
        if (typeof options.templates !== 'object') {
            throw new Error('[options.templates] must be typeof object')
        }

        // ?templates.columns (optional)
        if (options.templates.columns) {
            // !templates.columns[] (required)
            if (!(options.templates.columns instanceof Array)) {
                throw new Error('[options.templates.columns] must be typeof array')
            }
            // *templates.columns[]
            options.templates.columns.map((column, index) => {
                // !column.body (required)
                if (typeof column.body !== 'function') {
                    throw new Error(`[options.templates.columns[${index}].body] must be typeof function`)
                }
                // !column.filterField (required)
                if (typeof column.header !== 'string') {
                    throw new Error(`[options.templates.columns[${index}].header] must be typeof string`)
                }
                // !column.filterField (required)
                if (typeof column.field !== 'string') {
                    throw new Error(`[options.templates.columns[${index}].field] must be typeof string`)
                }
                // ?column.sortable (optional)
                if (column.sortable) {
                    if (typeof column.sortable !== 'boolean') {
                        throw new Error(`[options.templates.columns[${index}].sortable] must be typeof boolean`)
                    }
                }
                // ?column.sortField (optional)
                if (column.sortField) {
                    if (typeof column.sortField !== 'string') {
                        throw new Error(`[options.templates.columns[${index}].sortField] must be typeof string`)
                    }
                }
                // ?column.filter (optional)
                if (column.filter) {
                    if (typeof column.filter !== 'boolean') {
                        throw new Error(`[options.templates.columns[${index}].filter] must be typeof boolean`)
                    }
                }
                // ?column.filterField (optional)
                if (column.filterField) {
                    if (typeof column.filterField !== 'string') {
                        throw new Error(`[options.templates.columns[${index}].filterField] must be typeof string`)
                    }
                }
                // ?column.filterField (optional)
                if (column.filterElement) {
                    if (typeof column.filterElement !== 'function') {
                        throw new Error(`[options.templates.columns[${index}].filterElement] must be typeof function`)
                    }
                }
            })
        }
        // *templates.grid
        if (options.templates.grid) {
            if (typeof options.templates.grid !== 'function') {
                throw new Error('[options.templates.grid] must be typeof function')
            }
        }
        // *templates.list
        if (options.templates.list) {
            if (typeof options.templates.list !== 'function') {
                throw new Error('[options.templates.list] must be typeof function')
            }
        }

        // ?responsive (optional)
        if (options.responsive) {
            if (typeof options.responsive !== 'object') {
                throw new Error('[options.responsive] must be typeof object')
            }
            // ?responsive.sm (optional)
            if (options.responsive.sm) {
                if (typeof options.responsive.sm !== 'string') {
                    throw new Error('[options.responsive.sm] must be typeof string')
                }
            }
            // ?responsive.md (optional)
            if (options.responsive.md) {
                if (typeof options.responsive.md !== 'string') {
                    throw new Error('[options.responsive.md] must be typeof string')
                }
            }

            // ?responsive.lg (optional)
            if (options.responsive.lg) {
                if (typeof options.responsive.lg !== 'string') {
                    throw new Error('[options.responsive.lg] must be typeof string')
                }
            }

            // ?responsive.xl (optional)
            if (options.responsive.xl) {
                if (typeof options.responsive.xl !== 'string') {
                    throw new Error('[options.responsive.xl] must be typeof string')
                }
            }

            // ?responsive.xxl (optional)
            if (options.responsive.xxl) {
                if (typeof options.responsive.xxl !== 'string') {
                    throw new Error('[options.responsive.xxl] must be typeof string')
                }
            }
        }

        // ?add (optional)
        if (options.add) {
            if (typeof options.add !== 'object') {
                throw new Error('[options.add] must be typeof object')
            }
            if (options.add.visible) {
                if (typeof options.add.visible !== 'boolean') {
                    throw new Error('[options.add.visible] must be typeof boolean')
                }
            }
            // ?add.label (optional)
            if (options.add.label) {
                if (typeof options.add.label !== 'string') {
                    throw new Error('[options.add.label] must be typeof string')
                }
            }
            // ?add.icon (optional)
            // ?add.size (optional)
            if (options.add.size) {
                if (typeof options.add.size !== 'string') {
                    throw new Error('[options.add.size] must be typeof string')
                }
            }
            if (options.add.icon) {
                if (typeof options.add.icon !== 'string') {
                    throw new Error('[options.add.icon] must be typeof string')
                }
            }
            // ?add.severity (optional)
            if (options.add.severity) {
                if (typeof options.add.severity !== 'string') {
                    throw new Error('[options.add.severity] must be typeof string')
                }
            }
            // ?add.className (optional)
            if (options.add.className) {
                if (typeof options.add.className !== 'string') {
                    throw new Error('[options.add.className] must be typeof string')
                }
            }
            // ?add.style (optional)
            if (options.add.style) {
                if (typeof options.add.style !== 'object') {
                    throw new Error('[options.add.style] must be typeof object')
                }
            }
            // ?add.onClick (optional)
            if (options.add.onClick) {
                if (typeof options.add.onClick !== 'function') {
                    throw new Error('[options.add.onClick] must be typeof function')
                }
            }
        }

        // ?export (optional)
        if (options.export) {
            if (typeof options.export !== 'object') {
                throw new Error('[options.export] must be typeof object')
            }
            // ?export.type (optional)
            if (options.export.type) {
                if (typeof options.export.type !== 'string') {
                    throw new Error('[options.export.type] must be typeof string')
                }
            }
            // ?export.size (optional)
            if (options.export.size) {
                if (typeof options.export.size !== 'string') {
                    throw new Error('[options.export.size] must be typeof string')
                }
            }
            // ?export.severity (optional)
            if (options.export.severity) {
                if (typeof options.export.severity !== 'string') {
                    throw new Error('[options.export.severity] must be typeof string')
                }
            }
            // ?export.icon (optional)
            if (options.export.icon) {
                if (typeof options.export.icon !== 'string') {
                    throw new Error('[options.export.icon] must be typeof string')
                }
            }
            // ?export.label (optional)
            if (options.export.label) {
                if (typeof options.export.label !== 'string') {
                    throw new Error('[options.export.label] must be typeof string')
                }
            }
            // ?export.extensions (optional)
            if (options.export.extensions) {
                if (!(options.export.extensions) instanceof Array) {
                    throw new Error('[options.export.extensions] must be typeof array')
                }
                // *options.export.extensions[]
                options.export.extensions.forEach((extension, index) => {
                    // !extension (required)
                    if (typeof extension !== 'string') {
                        throw new Error(`[options.export.extensions[${index}]] must be typeof string`)
                    }
                    // !extensions with supported
                    if (!supportedExtensions.includes(extension)) {
                        throw new Error(`[options.export.extensions[${index}]] must be one of: 
                        ${supportedExtensions.join(', ').trim()}`)
                    }
                })
            }
            // ?export.xlsx (optional)
            if (options.export.xlsx) {
                if (typeof options.export.xlsx !== 'object') {
                    throw new Error('[options.export.xlsx] must be typeof object')
                }
                // ?export.xlsx.type (optional)
                if (options.export.xlsx.type) {
                    if (typeof options.export.xlsx.type !== 'string') {
                        throw new Error('[options.export.xlsx.type] must be typeof string')
                    }
                }
                // ?export.xlsx.className (optional)
                if (options.export.xlsx.className) {
                    if (typeof options.export.xlsx.className !== 'string') {
                        throw new Error('[options.export.xlsx.className] must be typeof string')
                    }
                }
                // ?export.xlsx.size (optional)
                if (options.export.xlsx.size) {
                    if (typeof options.export.xlsx.size !== 'string') {
                        throw new Error('[options.export.xlsx.size] must be typeof string')
                    }
                }
                // ?export.xlsx.severity (optional)
                if (options.export.xlsx.severity) {
                    if (typeof options.export.xlsx.severity !== 'string') {
                        throw new Error('[options.export.xlsx.severity] must be typeof string')
                    }
                }
                // ?export.xlsx.label (optional)
                if (options.export.xlsx.label) {
                    if (typeof options.export.xlsx.label !== 'string') {
                        throw new Error('[options.export.xlsx.label] must be typeof string')
                    }
                }
                // ?export.xlsx.icon (optional)
                if (options.export.xlsx.icon) {
                    if (typeof options.export.xlsx.icon !== 'string') {
                        throw new Error('[options.export.xlsx.icon] must be typeof string')
                    }
                }
                // ?export.xlsx.style (optional)
                if (options.export.xlsx.style) {
                    if (typeof options.export.xlsx.style !== 'object') {
                        throw new Error('[options.export.xlsx.style] must be typeof object')
                    }
                }
            }
            // ?export.csv (optional)
            if (options.export.csv) {
                if (typeof options.export.csv !== 'object') {
                    throw new Error('[options.export.csv] must be typeof object')
                }
                // ?export.csv.type (optional)
                if (options.export.csv.type) {
                    if (typeof options.export.csv.type !== 'string') {
                        throw new Error('[options.export.csv.type] must be typeof string')
                    }
                }
                // ?export.csv.className (optional)
                if (options.export.csv.className) {
                    if (typeof options.export.csv.className !== 'string') {
                        throw new Error('[options.export.csv.className] must be typeof string')
                    }
                }
                // ?export.csv.size (optional)
                if (options.export.csv.size) {
                    if (typeof options.export.csv.size !== 'string') {
                        throw new Error('[options.export.csv.size] must be typeof string')
                    }
                }
                // ?export.csv.severity (optional)
                if (options.export.csv.severity) {
                    if (typeof options.export.csv.severity !== 'string') {
                        throw new Error('[options.export.csv.severity] must be typeof string')
                    }
                }
                // ?export.csv.label (optional)
                if (options.export.csv.label) {
                    if (typeof options.export.csv.label !== 'string') {
                        throw new Error('[options.export.csv.label] must be typeof string')
                    }
                }
                // ?export.csv.icon (optional)
                if (options.export.csv.icon) {
                    if (typeof options.export.csv.icon !== 'string') {
                        throw new Error('[options.export.csv.icon] must be typeof string')
                    }
                }
                // ?export.csv.style (optional)
                if (options.export.csv.style) {
                    if (typeof options.export.csv.style !== 'object') {
                        throw new Error('[options.export.csv.style] must be typeof object')
                    }
                }
            }
            // ?export.pdf (optional)
            if (options.export.pdf) {
                if (typeof options.export.pdf !== 'object') {
                    throw new Error('[options.export.pdf] must be typeof object')
                }
                // ?export.pdf.type (optional)
                if (options.export.pdf.type) {
                    if (typeof options.export.pdf.type !== 'string') {
                        throw new Error('[options.export.pdf.type] must be typeof string')
                    }
                }
                // ?export.pdf.className (optional)
                if (options.export.pdf.className) {
                    if (typeof options.export.pdf.className !== 'string') {
                        throw new Error('[options.export.pdf.className] must be typeof string')
                    }
                }
                // ?export.pdf.size (optional)
                if (options.export.pdf.size) {
                    if (typeof options.export.pdf.size !== 'string') {
                        throw new Error('[options.export.pdf.size] must be typeof string')
                    }
                }
                // ?export.pdf.severity (optional)
                if (options.export.pdf.severity) {
                    if (typeof options.export.pdf.severity !== 'string') {
                        throw new Error('[options.export.pdf.severity] must be typeof string')
                    }
                }
                // ?export.pdf.label (optional)
                if (options.export.pdf.label) {
                    if (typeof options.export.pdf.label !== 'string') {
                        throw new Error('[options.export.pdf.label] must be typeof string')
                    }
                }
                // ?export.pdf.icon (optional)
                if (options.export.pdf.icon) {
                    if (typeof options.export.pdf.icon !== 'string') {
                        throw new Error('[options.export.pdf.icon] must be typeof string')
                    }
                }
                // ?export.pdf.style (optional)
                if (options.export.pdf.style) {
                    if (typeof options.export.pdf.style !== 'object') {
                        throw new Error('[options.export.pdf.style] must be typeof object')
                    }
                }
            }
        }
        // !onRequest (required)
        if (typeof options.onRequest !== 'function') {
            throw new Error('[options.onRequest] must be typeof function')
        }
        // ?onPageChange (optional)
        if (options.onPageChange) {
            if (typeof options.onPageChange !== 'function') {
                throw new Error('[options.onPageChange] must be typeof function')
            }
        }
        // ?onSortChange (optional)
        if (options.onSortChange) {
            if (typeof options.onSortChange !== 'function') {
                throw new Error('[options.onSortChange] must be typeof function')
            }
        }
        // ?onFilterChange (optional)
        if (options.onFilterChange) {
            if (typeof options.onFilterChange !== 'function') {
                throw new Error('[options.onFilterChange] must be typeof function')
            }
        }
        return true

    }

    /**
     * Mixs the current options with defaults
     * 
     * @param {DataviewOptions} options 
     * @returns {DataviewOptions}
     */
    defaults(options) {

        const defaultSort = {
            visible: true,
            className: '',
            placeholder: 'Ordenar resultados',
            optionLabel: 'label',
            style: { minWidth: '100%' }
        }

        const defaultPeerPageOptions = [5, 10, 20, 30, 40, 50]

        const defaultExport = {
            visible: true,
            type: 'button',
            className: '',
            size: 'small',
            severity: 'success',
            icon: 'pi pi-file-export',
            label: 'Exportar',
            style: {},
            fileName: 'export'
        }

        const defaultExportButtons = {
            csv: {
                type: 'button',
                className: '',
                size: 'small',
                severity: 'secondary',
                label: 'Arquivo (.csv)',
                icon: 'pi pi-file',
                style: { minWidth: '160px' }
            },
            pdf: {
                type: 'button',
                className: '',
                size: 'small',
                severity: 'primary',
                label: 'Arquivo (.pdf)',
                icon: 'pi pi-file-pdf',
                style: { minWidth: '160px' }
            },
            xlsx: {
                type: 'button',
                className: '',
                size: 'small',
                severity: 'success',
                label: 'Arquivo (.xlsx)',
                icon: 'pi pi-file-excel',
                style: { minWidth: '160px' }
            }
        }

        const defaultAddButton = {
            visible: true,
            label: 'Novo',
            icon: 'pi pi-plus',
            size: 'small',
            severity: 'primary',
            className: '',
            style: {}
        }

        // *DEFAULT HEIGHT
        if (!options.height) {
            options.height = '75vh'
        }

        // *DEFAULT SORTS
        if (options.sorts) {
            // *DEFAULT SORTS CLASSNAME
            if (!options.sorts.className) {
                options.sorts.className = defaultSort.className
            }
            // *DEFAULT SORTS PLACEHOLDER
            if (!options.sorts.placeholder) {
                options.sorts.placeholder = defaultSort.placeholder
            }
            // *DEFAULT SORTS OPTION LABEL
            if (!options.sorts.optionLabel) {
                options.sorts.optionLabel = defaultSort.optionLabel
            }
            // *DEFAULT SORTS STYLE
            if (!options.sorts.style) {
                options.sorts.style = defaultSort.style
            }
        }

        // *DEFAULT PAGINATION
        if (options.pagination) {
            // *DEFAULT PAGINATION PEER PAGE OPTIONS
            if (!options.pagination.peerPageOptions) {
                options.pagination.peerPageOptions = defaultPeerPageOptions
            }
        }

        // *DEFAULT ADD BUTTON
        if (options.add) {
            // *DEFAULT ADD BUTTON VISIBLE
            if (!options.add.visible) {
                options.add.visible = defaultAddButton.visible
            }
            // *DEFAULT ADD BUTTON LABEL
            if (!options.add.label) {
                options.add.label = defaultAddButton.label
            }
            // *DEFAULT ADD BUTTON ICON
            if (!options.add.icon) {
                options.add.icon = defaultAddButton.icon
            }
            // *DEFAULT ADD BUTTON SIZE
            if (!options.add.size) {
                options.add.size = defaultAddButton.size
            }
            // *DEFAULT ADD BUTTON SEVERITY
            if (!options.add.severity) {
                options.add.severity = defaultAddButton.severity
            }
            // *DEFAULT ADD BUTTON CLASSNAME
            if (!options.add.className) {
                options.add.className = defaultAddButton.className
            }
            // *DEFAULT ADD BUTTON STYLE
            if (!options.add.style) {
                options.add.style = defaultAddButton.style
            }
        } else {
            options.add = defaultAddButton
        }

        // *DEFAULT EXPORT
        if (options.export) {
            // *DEFAULT EXPORT VISIBLE
            if (!options.export.visible) {
                options.export.visible = defaultExport.visible
            }
            // *DEFAULT FILENAME
            if (!options.export.fileName) {
                options.export.fileName = defaultExport.fileName
            }
            // *DEFAULT EXPORT TYPE
            if (!options.export.type) {
                options.export.type = defaultExport.type
            }
            // *DEFAULT EXPORT CLASSNAME
            if (!options.export.className) {
                options.export.className = defaultExport.className
            }
            // *DEFAULT EXPORT SIZE
            if (!options.export.size) {
                options.export.size = defaultExport.size
            }
            // *DEFAULT EXPORT SEVERITY
            if (!options.export.severity) {
                options.export.severity = defaultExport.severity
            }
            // *DEFAULT EXPORT ICON
            if (!options.export.icon) {
                options.export.icon = defaultExport.icon
            }
            // *DEFAULT EXPORT LABEL
            if (!options.export.label) {
                options.export.label = defaultExport.label
            }
            // *DEFAULT EXPORT STYLE
            if (!options.export.style) {
                options.export.style = defaultExport.style
            }
            // *DEFAULT EXPORT CSV
            if (options.export.csv) {
                // *export.csv.type
                if (!options.export.csv.type) {
                    options.export.csv.type = defaultExportButtons.csv.type
                }
                // *export.csv.className
                if (!options.export.csv.className) {
                    options.export.csv.className = defaultExportButtons.csv.className
                }
                // *export.csv.size
                if (!options.export.csv.size) {
                    options.export.csv.size = defaultExportButtons.csv.size
                }
                // *export.csv.severity
                if (!options.export.csv.severity) {
                    options.export.csv.severity = defaultExportButtons.csv.severity
                }
                // *export.csv.label
                if (!options.export.csv.label) {
                    options.export.csv.label = defaultExportButtons.csv.label
                }
                // *export.csv.icon
                if (!options.export.csv.icon) {
                    options.export.csv.icon = defaultExportButtons.csv.icon
                }
                // *export.csv.style
                if (!options.export.csv.style) {
                    options.export.csv.style = defaultExportButtons.csv.style
                }
            } else {
                options.export.csv = defaultExportButtons.csv
            }
            // *DEFAULT EXPORT PDF
            if (options.export.pdf) {
                // *export.pdf.type
                if (!options.export.pdf.type) {
                    options.export.pdf.type = defaultExportButtons.pdf.type
                }
                // *export.pdf.className
                if (!options.export.pdf.className) {
                    options.export.pdf.className = defaultExportButtons.pdf.className
                }
                // *export.pdf.size
                if (!options.export.pdf.size) {
                    options.export.pdf.size = defaultExportButtons.pdf.size
                }
                // *export.pdf.severity
                if (!options.export.pdf.severity) {
                    options.export.pdf.severity = defaultExportButtons.pdf.severity
                }
                // *export.pdf.label
                if (!options.export.pdf.label) {
                    options.export.pdf.label = defaultExportButtons.pdf.label
                }
                // *export.pdf.icon
                if (!options.export.pdf.icon) {
                    options.export.pdf.icon = defaultExportButtons.pdf.icon
                }
                // *export.pdf.style
                if (!options.export.pdf.style) {
                    options.export.pdf.style = defaultExportButtons.pdf.style
                }
            } else {
                options.export.pdf = defaultExportButtons.pdf
            }
            // *DEFAUL EXPORT XLSX
            if (options.export.xlsx) {
                // *export.xlsx.type
                if (!options.export.xlsx.type) {
                    options.export.xlsx.type = defaultExportButtons.xlsx.type
                }
                // *export.xlsx.className
                if (!options.export.xlsx.className) {
                    options.export.xlsx.className = defaultExportButtons.xlsx.className
                }
                // *export.xlsx.size
                if (!options.export.xlsx.size) {
                    options.export.xlsx.size = defaultExportButtons.xlsx.size
                }
                // *export.xlsx.severity
                if (!options.export.xlsx.severity) {
                    options.export.xlsx.severity = defaultExportButtons.xlsx.severity
                }
                // *export.xlsx.label
                if (!options.export.xlsx.label) {
                    options.export.xlsx.label = defaultExportButtons.xlsx.label
                }
                // *export.xlsx.icon
                if (!options.export.xlsx.icon) {
                    options.export.xlsx.icon = defaultExportButtons.xlsx.icon
                }
                // *export.xlsx.style
                if (!options.export.xlsx.style) {
                    options.export.xlsx.style = defaultExportButtons.xlsx.style
                }
            } else {
                options.export.xlsx = defaultExportButtons.xlsx
            }
        }
        return options
    }

    /**
     * Dispatch the values
     * @param {DataviewOptions} originalOptions 
     */
    dispatch(originalOptions) {
        const options = this.defaults(originalOptions)
        console.log('options optimized', options)
        // *CONFIG
        this.type = options.type
        this.title = options.title
        this.height = options.height
        this.pagination = options.pagination
        this.sorts = options.sorts
        this.filters = options.filters
        this.templates = options.templates
        this.responsive = options.responsive
        this.add = options.add
        this.export = options.export
        // *CALLBACKS
        this.onRequest = options.onRequest
        this.onPageChange = options.onPageChange
        this.onSortChange = options.onSortChange
        this.onFilterChange = options.onFilterChange
        // !FLAG: only for read
        this.build = true
    }

}

export default DataviewOptions