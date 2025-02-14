import React, { useContext } from 'react'

import { ConnectedPagination, Table, Row, Col } from 'components'

import { withDefaultPaginationContext, DefaultPaginationContext } from 'contexts'

const ConnectedPaginatedTable = ({ endpoint, children, ...props }) => {
    const paginationProps = useContext(DefaultPaginationContext)

    return (
        <Row>
            <Row>
                <Col>
                    <Table {...props}>
                        {children(paginationProps)}
                    </Table>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ConnectedPagination context={DefaultPaginationContext} endpoint={endpoint} />
                </Col>

                <Col>
                    <ConnectedPagination.PerPageDropdown context={DefaultPaginationContext} endpoint={endpoint} />
                </Col>
            </Row>
        </Row>
    )
}

export default withDefaultPaginationContext(ConnectedPaginatedTable)