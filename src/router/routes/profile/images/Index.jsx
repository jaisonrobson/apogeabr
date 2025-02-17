import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"

import { compareDates } from 'util/intl'
import { typeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import {
    Row,
    Col,
    StoneTabletTwoBoard,
    Container,
    TitleH2,
    ConnectedPaginatedCardsDisplay,
} from 'components'

const Images = () => {
    const { formatDateTime, translate } = useContext(I18nContext)
    
    return (
        <Row>
            <Col display="flex" flexDirection="column" gap="2rem">
                <Row className="row-cols-2" justifyContent="center" alignItems="center" gap="2rem">
                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="2"
                        minWidth="425px"
                    >
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >

                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <Row width="100%" gap="2rem">
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <TitleH2 className="text-gray-800">Imagens</TitleH2>
                                    </Col>
                                </Row>

                                <Row width="100%" gap="2rem">
                                    <Col
                                        display="flex"
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <ConnectedPaginatedCardsDisplay endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/images`}>
                                            {({ payload, isLoading }) => (
                                                <Row>
                                                    <Col>
                                                    
                                                    </Col>
                                                </Row>
                                            )}
                                        </ConnectedPaginatedCardsDisplay>
                                    </Col>
                                </Row>
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Images
