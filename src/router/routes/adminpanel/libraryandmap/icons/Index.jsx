import React, { Fragment, useContext } from 'react'
import _ from 'lodash'

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
    CreateIconFormModal,
    UpdateIconFormModal,
    DeleteRecordModalButton,
} from 'components'

const Index = () => {
    const { formatDateTime } = useContext(I18nContext)

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
                                        <ConnectedPaginatedTable light endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/icons`}>
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
                                                                Imagem
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (icon, index) => (
                                                            <Table.Row key={icon.id} light>
                                                                <Table.CellHeader>
                                                                    {`${icon.id}-${icon.icon_translation.locale_id}`}
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
                                                                            <UpdateIconFormModal icon={icon} />
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <DeleteRecordModalButton
                                                                                deleteEndpoint={`icons/${icon.id}`}
                                                                                deleteRoutePath={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(icon.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(icon.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {icon.icon_translation.name}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Image
                                                                        src={icon.image || noImage}
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
                                                            <CreateIconFormModal headerCount={headerCount} />
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