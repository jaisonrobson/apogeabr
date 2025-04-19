import React, { Fragment, useContext } from 'react'
import _ from 'lodash'

import ROUTES from 'router/routes'

import { I18nContext } from 'contexts'

import {
    Table,
    Row,
    Col,
    MarbleTabletBoard,
    Container,
    CreateCommuniqueFormModal,
    UpdateCommuniqueFormModal,
    DeleteRecordModalButton,
    SearchableConnectedPaginatedTable,
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
                                    <Col>
                                        <SearchableConnectedPaginatedTable
                                            light
                                            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/communiques/search`}
                                            endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/communiques`}
                                        >
                                            {({ payload, headerCount }) => (
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
                                                                Criado por
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Última atualização
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Título
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Conteúdo
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (communique, index) => (
                                                            <Table.Row key={communique.id} light>
                                                                <Table.Cell>
                                                                    {communique.id}
                                                                </Table.Cell>

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
                                                                            <UpdateCommuniqueFormModal communique={communique} />
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <DeleteRecordModalButton
                                                                                deleteEndpoint={`communiques/${communique.id}`}
                                                                                deleteRoutePath={ROUTES.USER_ADMIN_PANEL_COMMUNIQUES.path}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(communique.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {communique?.created_by_name || '-'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(communique.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {communique.communique_translation?.title || 'Sem título'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {communique.communique_translation?.content?.substring(0, 50) || 'Sem conteúdo'}...
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))}

                                                        <Table.Row light>
                                                            <CreateCommuniqueFormModal headerCount={headerCount} />
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Fragment>
                                            )}
                                        </SearchableConnectedPaginatedTable>
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