import React from 'react'
import { useRouteLoaderData, Outlet, useLocation } from 'react-router-dom'
import _ from 'lodash'

import {
    MarbleTabletBoard,
    Container,
    Row,
    Col,
    Image,
    Span,
    Date,
} from 'components'

const LibraryAndMap = () => {
    const { user } = useRouteLoaderData("root")
    const location = useLocation()

    

    return (
        <Row justifyContent="center" height="100%">
            <Col
                margin="0px 50px"
                minWidth="300px"
            >
                {
                    _.endsWith(location.pathname, 'libraryandmap/')
                        ? (
                            <MarbleTabletBoard padding="0px">
                                <Container
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className="unselectable text-gray-200"
                                    gap="7px"
                                >
                                    <Row>
                                        <Span>Selecione uma opção</Span>
                                    </Row>                        
                                </Container>
                            </MarbleTabletBoard>
                        )
                        : (
                            <Outlet />
                        )
                }                
            </Col>
        </Row>
    )
}

export default LibraryAndMap
