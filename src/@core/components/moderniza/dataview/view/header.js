/* eslint-disable no-unused-vars */
import React from 'react'
import { exportButton, layoutButton, searchBar, sortButton, addButton } from './components'
import { Col, Row } from 'reactstrap'

/**
 * Dataview header view
 * 
 * @param {String} title 
 * @param {Boolean} loading 
 * @param {String} layout 
 * @param {Function} onChangeLayout 
 * @param {String} globalFilterValue 
 * @param {Function} onGlobalFilterChange 
 * @param {Object} optionsExport 
 * @param {Object} dataTableRefOrSorts 
 * @param {Object|String} exportOverPanelRefOrSortKey 
 * @param {Array|Function} resultsOrOnSortChange 
 * @param {Array} exportColumns 
 * @param {{width: Number, height: Number }} deviceSize
 * 
 * @returns {JSX.Element}
 */
const header = (title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, optionsExport, dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, exportColumns, sortOptions, addOptions, deviceSize) => {
    return (
        <>
            {
                console.log('devicesize', deviceSize)
            }
            <Row className="m-0">
                <Col xs="12" lg="" className="mb-1 mb-lg-auto my-auto">
                    <Row>
                        <Col xs="auto" sm="" className="my-auto ps-0">
                            {
                                title ? (
                                    <div className="flex">
                                        <h4 className="m-0">{title}</h4>
                                    </div>
                                ) : <></>
                            }
                        </Col>
                        <Col xs="" sm="8" lg="auto" className="my-auto pe-0">
                            {
                                searchBar(loading, globalFilterValue, onGlobalFilterChange)
                            }
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" lg="auto" className='ms-auto my-auto'>
                    <Row className="justify-content-end">
                        {
                            optionsExport && optionsExport.visible && layout === 'table' ? (
                                <Col className="col-auto pe-0 my-auto">
                                    {
                                        exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey)
                                    }
                                </Col>
                            ) : <></>
                        }
                        {
                            sortOptions.visible && layout !== 'table' && dataTableRefOrSorts.sortOptions ? (
                                <Col className="col-auto pe-0 my-auto ps-0 ps-lg-1 flex-grow-1 flex-lg-grow-0">
                                    {
                                        sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, deviceSize)
                                    }
                                </Col>
                            ) : <></>
                        }
                        <Col className="col-auto pe-0 my-auto">
                            {
                                layoutButton(layout, onChangeLayout, deviceSize)
                            }
                        </Col>
                        {
                            addOptions.visible ? (
                                <Col className="col-auto pe-0 my-auto">
                                    {
                                        addButton(addOptions, deviceSize)
                                    }
                                </Col>
                            ) : <></>
                        }
                    </Row>
                </Col>
            </Row>
            {/* <div className='flex flex-wrap justify-content-end align-items-center'>
                <div className='flex me-auto me:lg-1 justify-content-start align-items-center flex-grow-1'>
                    {
                        title ? (
                            <div className="flex me-2">
                                <h4 className="m-0">{title}</h4>
                            </div>
                        ) : ''
                    }
                </div>
                <div className='flex me-auto lg:me-1 mb-2 lg:mb-0 flex-grow-1'>
                    {
                        searchBar(loading, globalFilterValue, onGlobalFilterChange)
                    }
                </div>
                <div className='header-bottom-content flex flex-row flex-grow-1 lg:flex-grow-0 justify-content-end align-items-center'>
                    <div className="flex flex-wrap gap-2 flex-grow-1">
                        {
                            optionsExport && optionsExport.visible && layout === 'table' ? exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey) : ''
                        }
                        {
                            sortOptions.visible && layout !== 'table' && dataTableRefOrSorts.sortOptions ? sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange) : ''
                        }
                        {
                            layoutButton(layout, onChangeLayout)
                        }
                        {
                            // TODO: Botão adicionar
                            addOptions.visible ? addButton(addOptions) : ''
                        }
                    </div>
                </div>
            </div> */}

            {/* <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
                {
                    title ? (
                        <div className="flex me-auto">
                            <h4 className="m-0">{title}</h4>
                        </div>
                    ) : ''
                }
                {
                    searchBar(loading, globalFilterValue, onGlobalFilterChange)
                }
                {
                    optionsExport && optionsExport.visible && layout === 'table' ? exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey) : ''
                }
                {
                    sortOptions.visible && layout !== 'table' && dataTableRefOrSorts.sortOptions ? sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange) : ''
                }
                {
                    layoutButton(layout, onChangeLayout)
                }
                {
                    // TODO: Botão adicionar
                    addOptions.visible ? addButton(addOptions) : ''
                }
            </div> */}
        </>
    )
}

export {
    header
}