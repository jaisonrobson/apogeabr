import React, { useContext } from 'react'

import { ConnectedPagination, Table, Row, Col } from 'components'

import { withDefaultPaginationContext, DefaultPaginationContext } from 'contexts'

const ConnectedPaginatedTable = ({ endpoint, children, light = false, ...props }) => {
    const paginationProps = useContext(DefaultPaginationContext)

    return (
        <Row>
            <Row>
                <Col>
                    <Table color={!light ? "undefined" : "white"} {...props}>
                        {children(paginationProps)}
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col display="flex" justifyContent="center">
                    <ConnectedPagination
                        context={DefaultPaginationContext}
                        endpoint={endpoint}
                        themeItemProps={{ light }}
                        themeLinkProps={{ light }}
                    />  
                </Col>

                <Col display="flex" justifyContent="center">
                    <ConnectedPagination.PerPageDropdown
                        context={DefaultPaginationContext}
                        endpoint={endpoint}
                        light={light}
                    />
                </Col>
            </Row>
        </Row>
    )
}

export default withDefaultPaginationContext(ConnectedPaginatedTable)