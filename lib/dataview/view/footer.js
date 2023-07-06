/* eslint-disable no-unused-vars */
import React from 'react'
import { Paginator } from 'primereact/paginator'
import paginatorLeft from './components/paginatorLeft'
import paginatorRight from './components/paginatorRight'

/**
 * Dataview footer view
 * 
 * @param {Number} first 
 * @param {Number} rows 
 * @param {Number} totalRecords 
 * @param {Function} onPageChange 
 * @param {Number[]} peerPageOptions 
 * @param {Function} onChangePeerPageCallback 
 * 
 * @returns {JSX.Element}
 */
const footer = (first, rows, totalRecords, onPageChange, peerPageOptions, onChangePeerPageCallback, optionsPagination, deviceSize) => {
  const getPageLinkSize = () => {
    if (deviceSize.width < 575.98) {
      return 1
    } else if (deviceSize.width > 575.98 && deviceSize.width < 767.98) {
      return 3
    } else {
      return 5
    }
  }
  const getRightContent = () => {
    if (deviceSize.width < 575.98) {
      return /*#__PURE__*/React.createElement(React.Fragment, null)
    } else {
      return paginatorRight(rows, peerPageOptions, onChangePeerPageCallback)
    }
  }
  const getLeftContent = () => {
    if (deviceSize.width < 575.98) {
      return /*#__PURE__*/React.createElement(React.Fragment, null)
    } else {
      return paginatorLeft(totalRecords)
    }
  }
  return optionsPagination?.visible ? /*#__PURE__*/React.createElement(Paginator, {
    pageLinkSize: getPageLinkSize(),
    first,
    rows,
    totalRecords,
    onPageChange,
    rightContent: getRightContent(),
    leftContent: getLeftContent()
  }) : /*#__PURE__*/React.createElement(React.Fragment, null)
}
export { footer }