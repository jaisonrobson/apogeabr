import React, { useContext } from 'react'

import { ConnectedPagination, Row, Col, Button, Input } from 'components'

import { withDefaultPaginationContext, DefaultPaginationContext } from 'contexts'

const ConnectedPaginatedCardsDisplay = ({ endpoint, children, ...props }) => {
    const paginationProps = useContext(DefaultPaginationContext)

    const onFilterValidImages = (event) => paginationProps.setParams({ validated: event.target.checked })

    return (
        <Row>
            <Row>
                <Col>
                    {children(paginationProps)}                    
                </Col>
            </Row>

            <Row>
                <Col display="flex" justifyContent="center">
                    <ConnectedPagination context={DefaultPaginationContext} endpoint={endpoint} />
                </Col>

                <Col display="flex" justifyContent="center" alignItems="center" fontFamily="Retro Computer" fontSize="13px">
                    <Input id="imagesValidatedFilterCheckbox" type="checkbox" onClick={onFilterValidImages}/>

                    <label htmlFor="imagesValidatedFilterCheckbox" style={{ marginLeft: "15px", width: '100px' }}>Apenas validas</label>
                </Col>

                <Col display="flex" justifyContent="center">
                    <ConnectedPagination.PerPageDropdown context={DefaultPaginationContext} endpoint={endpoint} />
                </Col>
            </Row>
        </Row>
    )
}

export default withDefaultPaginationContext(ConnectedPaginatedCardsDisplay)