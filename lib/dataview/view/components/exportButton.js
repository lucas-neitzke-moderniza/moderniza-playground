import React from 'react'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import { exportCSV, exportPdf, exportExcel } from '../../controller/DataviewExport'

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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    type: optionsExport?.type,
    className: optionsExport?.className,
    size: optionsExport?.size,
    severity: optionsExport?.severity,
    icon: optionsExport?.icon,
    label: optionsExport?.label,
    style: optionsExport?.style,
    onClick: e => exportOverPanelRef.current.toggle(e)
  }), /*#__PURE__*/React.createElement(OverlayPanel, {
    ref: exportOverPanelRef
  }, extensions.includes('xlsx') ? /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    type: optionsExport?.xlsx?.type,
    className: optionsExport?.xlsx?.className,
    size: optionsExport?.xlsx?.size,
    severity: optionsExport?.xlsx?.severity,
    label: optionsExport?.xlsx?.label,
    icon: optionsExport?.xlsx?.icon,
    style: optionsExport?.xlsx?.style,
    onClick: () => {
      exportExcel(results, optionsExport?.fileName)
    }
  })) : '', extensions.includes('pdf') ? /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    type: optionsExport?.pdf?.type,
    className: optionsExport?.pdf?.className,
    size: optionsExport?.pdf?.size,
    severity: optionsExport?.pdf?.severity,
    label: optionsExport?.pdf?.label,
    icon: optionsExport?.pdf?.icon,
    style: optionsExport?.pdf?.style,
    onClick: () => {
      exportPdf(results, optionsExport?.fileName, exportColumns)
    }
  })) : '', extensions.includes('csv') ? /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement(Button, {
    type: optionsExport?.csv?.type,
    className: optionsExport?.csv?.className,
    size: optionsExport?.csv?.size,
    severity: optionsExport?.csv?.severity,
    label: optionsExport?.csv?.label,
    icon: optionsExport?.csv?.icon,
    style: optionsExport?.csv?.style,
    onClick: () => {
      exportCSV(dataTableRef, false)
    }
  })) : ''))
}
export default exportButton