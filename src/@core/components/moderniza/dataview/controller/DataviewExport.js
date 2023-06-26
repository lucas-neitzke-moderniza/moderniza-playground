const exportCSV = (dataTableRef, selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly })
}

const exportPdf = (_data, fileName, exportColumns) => {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0)
            doc.autoTable(exportColumns, _data)
            doc.save(`${fileName}.pdf`)
        })
    })
}

const exportExcel = (_data, fileName) => {

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                const EXCEL_EXTENSION = '.xlsx'
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                })

                module.default.saveAs(data, `${fileName}${EXCEL_EXTENSION}`)
            }
        })
    }

    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(_data)
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        })

        saveAsExcelFile(excelBuffer, fileName)
    })
}


export {
    exportExcel,
    exportPdf,
    exportCSV
}