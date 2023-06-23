import { Dropdown } from "primereact/dropdown"

const paginatorRight = (rows, peerPageOptions, onChangePeerPageCallback) => {
    return (
        <Dropdown value={rows} options={peerPageOptions} onChange={(e) => {
            onChangePeerPageCallback(e)
        }} />
    )
}

export default paginatorRight