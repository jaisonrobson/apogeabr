import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

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
    const { user } = useRouteLoaderData("root")

    return (
        <Row padding="0px 50px">
            <Col padding="0px 2rem">
                <StoneTabletTwoBoard padding="0px">
                    <Container
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className="unselectable"
                        gap="7px"
                    >
                        <Row justifyContent="center" margin="20px 0px">
                            <Image
                                src={user?.image || userNoAvatarImage}
                                className="rounded-circle"
                                objectFit="contain"
                                width="150px"
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

            <Col padding="0px 2rem" flexGrow="2">
                <StoneTabletTwoBoard padding="0px 75px">
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
