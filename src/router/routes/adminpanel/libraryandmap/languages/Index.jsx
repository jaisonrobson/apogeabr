import React, { useEffect, Fragment, useContext } from 'react'
import _ from 'lodash'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

import { I18nContext } from 'contexts'

import noImage from 'images/layout/generic/noImage.png'

import {
    Table,
    Row,
    Col,
    MarbleTabletBoard,
    Container,
    ConnectedPaginatedTable,
    Image,
} from 'components'

import DeleteModalButton from './Delete'
import UpdateModalButton from './Update'
import CreateModalRecordTableCell from './Create'

const Index = () => {
    const { formatDateTime } = useContext(I18nContext)
    const navigate = useNavigate()
    const { user } = useRouteLoaderData("root")

    useEffect(() => {
        if (user.privilege.value < 20)
            navigate(ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP.path)
    }, [user, navigate])

    return (
        <Row>
            <Col display="flex" flexDirection="column" gap="2rem">
                <Row>
                    <Col>
                        <MarbleTabletBoard>
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
                                        <ConnectedPaginatedTable light endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/locales`}>
                                            {({ payload, isLoading, headerCount }) => (
                                                <Fragment>
                                                    <Table.Header>
                                                        <Table.Row light>
                                                            <Table.CellHeader>
                                                                #
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Ações
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Criação
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Última atualização
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Nome
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Código de país
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Imagem
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (locale, index) => (
                                                            <Table.Row key={locale.id} light>
                                                                <Table.CellHeader>
                                                                    {locale.id}
                                                                </Table.CellHeader>

                                                                <Table.Cell>
                                                                    <Row
                                                                        display="flex"
                                                                        flexDirection="row"
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                        width="100px"
                                                                        gap="0px"
                                                                        padding="5px"
                                                                    >
                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <UpdateModalButton locale={locale} />
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <DeleteModalButton localeId={locale.id} />
                                                                        </Col>
                                                                    </Row>
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(locale.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(locale.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {locale.name}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {locale.countrycode}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Image
                                                                        src={locale.image || noImage}
                                                                        className="rounded-circle"
                                                                        objectFit="contain"
                                                                        width="25px"
                                                                        minWidth="25px"
                                                                        maxWidth="25px"
                                                                        height="25px"
                                                                        minHeight="25px"
                                                                        maxHeight="25px"
                                                                    />
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))}

                                                        <Table.Row light>
                                                            <CreateModalRecordTableCell headerCount={headerCount} />
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Fragment>
                                            )}
                                        </ConnectedPaginatedTable>
                                    </Col>
                                </Row>
                            </Container>
                        </MarbleTabletBoard>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Index