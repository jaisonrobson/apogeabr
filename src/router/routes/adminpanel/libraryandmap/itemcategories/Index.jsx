import React, { useEffect } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

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
    const navigate = useNavigate()
    const { user } = useRouteLoaderData("root")

    useEffect(() => {
        if (user.privilege.value < 20)
            navigate(ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP.path)
    }, [user, navigate])

    return (
        <Row justifyContent="center">
            <Col
                xs="12"
                sm="12"
                md="8"
                lg="6"
                xl="4"
                xxl="2"
                margin="0px 50px"
                minWidth="300px"
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
    )
}

export default Overview
