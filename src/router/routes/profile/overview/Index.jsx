import React, { useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { subscriptionTypeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import {
    StoneTabletTwoBoard,
    Container,
    Row,
    Col,
    Image,
    Span,
    Date,
} from 'components'

const Overview = () => {
    const { user } = useRouteLoaderData("root")
    const { translate } = useContext(I18nContext)

    return (
        <Row justifyContent="center" gap="3rem">
            <Row justifyContent="center" gap="3rem">
                <Col
                    xs="12"
                    sm="12"
                    md="8"
                    lg="6"
                    xl="4"
                    xxl="2"
                    margin="0px 50px"
                    minWidth="325px"
                >
                    <StoneTabletTwoBoard padding="0px">
                        <Container
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            className="unselectable"
                            gap="7px"
                        >
                            <Row justifyContent="center">
                                <Image
                                    src={user?.image || userNoAvatarImage}
                                    className="rounded-circle"
                                    objectFit="contain"
                                    width="150px"
                                    minWidth="150px"
                                />
                            </Row>

                            <Row>
                                <Span>{user.name ? user.name : 'Usuário sem nome'}</Span>
                            </Row>

                            <Row>
                                <Span>{user.privilege ? user.privilege.name : 'Usuário'}</Span>
                            </Row>

                            <Row>
                                <Span>{user.country_code ? user.country_code : 'País não identificado'}</Span>
                            </Row>
                        </Container>
                    </StoneTabletTwoBoard>
                </Col>

                <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="10"
                    xl="6"
                    xxl="4"
                    margin="0px 50px"
                    minWidth="550px"
                >
                    <StoneTabletTwoBoard>
                        <Container
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            className="unselectable"
                        >
                            <Row>
                                <Col display="flex" flexDirection="column" gap="15px">
                                    <Row>
                                        <Span>{"Email: "+user.email}</Span>
                                    </Row>

                                    <Row>
                                        <Span>{"Telefone: "+ (user.phone_number ? user.phone_number : "Sem telefone")}</Span>
                                    </Row>

                                    <Row>
                                        <Span>{"Criado em: "}<Date date={user.created_at} /></Span>
                                    </Row>

                                    <Row>
                                        <Span>{"Ultimo login: "}<Date date={user.last_logon} /></Span>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </StoneTabletTwoBoard>
                </Col>
            </Row>

            <Row justifyContent="center" gap="3rem">
                <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="10"
                    xl="6"
                    xxl="4"
                    margin="0px 50px"
                    minWidth="550px"
                >
                    <StoneTabletTwoBoard>
                        <Container
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            className="unselectable"
                            gap="7px"
                        >
                            <Row>
                                <Col display="flex" flexDirection="column" gap="15px">
                                    <Row>
                                        <Span>Afiliação: {user.current_subscription ? translate(subscriptionTypeAsDescription(user.current_subscription.level)) : "Não afiliado"}</Span>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col display="flex" flexDirection="column" gap="15px">
                                    <Row>
                                        <Span>Créditos rotativos: {user.monthly_credits}</Span>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col display="flex" flexDirection="column" gap="15px">
                                    <Row>
                                        <Span>Créditos permanentes: {user.permanent_credits}</Span>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </StoneTabletTwoBoard>
                </Col>
            </Row>
        </Row>
    )
}

export default Overview
