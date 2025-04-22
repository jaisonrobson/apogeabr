import React, { useContext, useRef, useState, useEffect } from 'react'

import { ConnectedPagination, Table, Row, Col } from 'components'

import { withDefaultPaginationContext, DefaultPaginationContext } from 'contexts'

const ConnectedPaginatedTable = ({ endpoint, overwritedEndpoint = "", children, light = false, onRefresh, ...props }) => {
    const paginationProps = useContext(DefaultPaginationContext)
    const tableRef = useRef()
    const [headerCount, setHeaderCount] = useState(0)
    
    useEffect(() => {
        if (tableRef.current) {
            const tableHeader = tableRef.current.querySelector("thead")

            if (tableHeader) {
                const thElements = tableHeader.querySelectorAll("th")
                setHeaderCount(thElements.length)
            }
        }
    }, [])

    return (
        <Row>
            <Row>
                <Col>
                    <Table ref={tableRef} color={!light ? "undefined" : "white"} {...props}>
                        {children({ ...paginationProps, headerCount })}
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col display="flex" justifyContent="center">
                    <ConnectedPagination
                        context={DefaultPaginationContext}
                        endpoint={endpoint}
                        overwritedEndpoint={overwritedEndpoint}
                        themeItemProps={{ light }}
                        themeLinkProps={{ light }}
                        onRefresh={onRefresh}
                    />  
                </Col>

                <Col display="flex" justifyContent="center">
                    <ConnectedPagination.PerPageDropdown
                        context={DefaultPaginationContext}
                        endpoint={endpoint}
                        overwritedEndpoint={overwritedEndpoint}
                        light={light}
                        onRefresh={onRefresh}
                    />
                </Col>
            </Row>
        </Row>
    )
}

export default withDefaultPaginationContext(ConnectedPaginatedTable)