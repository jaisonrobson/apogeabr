import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import {
    MarbleTabletBoard,
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
                <MarbleTabletBoard padding="0px">
                    <Container
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className="unselectable text-gray-200"
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
                </MarbleTabletBoard>
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
                <MarbleTabletBoard>
                    <Container
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className="unselectable text-gray-200"
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
                </MarbleTabletBoard>
            </Col>
        </Row>        
    )
}

export default Overview
