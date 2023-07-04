import { Button } from "primereact/button"

/**
 * Add header button
 * 
* @param {{label:String, icon: String, severity: String, className: String, style: Object, onClick: Function, size: String}} addOptions
 * @returns {JSX.Element}
 */
const addButton = (addOptions) => {
    return (
        <Button
            label={addOptions?.label}
            icon={addOptions?.icon}
            size={addOptions?.size}
            severity={addOptions?.severity}
            className={addOptions?.className}
            style={addOptions?.style}
            onClick={(e) => {
                if (addOptions?.onClick) {
                    addOptions?.onClick(e)
                }
            }}
        />
    )
}

export default addButton