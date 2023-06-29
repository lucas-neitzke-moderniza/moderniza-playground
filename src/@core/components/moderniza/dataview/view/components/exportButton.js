import React from 'react'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import {
    exportCSV,
    exportPdf,
    exportExcel
} from '../../controller/DataviewExport'

/**
 * Dataview header export button
 * 
 * @param {Object} optionsExport 
 * @param {Object} dataTableRef 
 * @param {Array} results 
 * @param {String[]} exportColumns 
 * @param {Object} exportOverPanelRef 
 * 
 * @returns {JSX.Element}
 */
const exportButton = (optionsExport, dataTableRef, results, exportColumns, exportOverPanelRef) => {
    /**
     * @type {Array}
     */
    const extensions = optionsExport?.extensions
    return (
        <div className="flex">
            <Button
                type={optionsExport?.type || 'button'}
                size={optionsExport?.size || 'small'}
                severity={optionsExport?.severity || 'success'}
                icon={optionsExport?.icon || 'pi pi-file-export'}
                label={optionsExport?.label || 'Exportar'}
                onClick={(e) => exportOverPanelRef.current.toggle(e)} />
            <OverlayPanel ref={exportOverPanelRef}>
                {
                    (optionsExport?.xlsx || extensions.includes('xlsx')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.xlsx?.type || 'button'}
                                className={optionsExport?.xlsx?.className || ''}
                                size={optionsExport?.xlsx?.size || 'small'}
                                severity={optionsExport?.xlsx?.severity || 'success'}
                                label={optionsExport?.xlsx?.label || 'Planilha (.xlsx)'}
                                icon={optionsExport?.xlsx?.icon || 'pi pi-file-excel'}
                                style={optionsExport?.xlsx?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportExcel(results, optionsExport?.fileName)
                                }} />
                        </div>
                    ) : ''
                }
                {
                    (optionsExport?.pdf || extensions.includes('pdf')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.pdf?.type || 'button'}
                                className={optionsExport?.pdf?.className || ''}
                                size={optionsExport?.pdf?.size || 'small'}
                                severity={optionsExport?.pdf?.severity || 'primary'}
                                label={optionsExport?.pdf?.label || 'Documento (.pdf)'}
                                icon={optionsExport?.pdf?.icon || 'pi pi-file-pdf'}
                                style={optionsExport?.pdf?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportPdf(results, optionsExport?.fileName, exportColumns)
                                }} />
                        </div>
                    ) : ''
                }
                {
                    (optionsExport?.csv || extensions.includes('csv')) ? (
                        <div className='mb-1'>
                            <Button
                                type={optionsExport?.csv?.type || 'button'}
                                className={optionsExport?.csv?.className || ''}
                                size={optionsExport?.csv?.size || 'small'}
                                severity={optionsExport?.csv?.severity || 'secondary'}
                                label={optionsExport?.csv?.label || 'Arquivo (.csv)'}
                                icon={optionsExport?.csv?.icon || 'pi pi-file'}
                                style={optionsExport?.csv?.style || { minWidth: '160px' }}
                                onClick={() => {
                                    exportCSV(dataTableRef, false)
                                }} />
                        </div>
                    ) : ''
                }
            </OverlayPanel>
        </div>
    )
}

export default exportButton