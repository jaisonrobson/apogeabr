import React, { Fragment, useContext, useEffect } from 'react'
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
    Image,
    CreateTraitFormModal,
    UpdateTraitFormModal,
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
                                            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/traits/search`}
                                            endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/traits`}
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
                                                        {_.map(payload, (trait, index) => (
                                                            <Table.Row key={trait.id} light>
                                                                <Table.CellHeader>
                                                                    {`${trait.id}`}
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
                                                                            <UpdateTraitFormModal trait={trait} />
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <DeleteRecordModalButton
                                                                                deleteEndpoint={`traits/${trait.id}`}
                                                                                deleteRoutePath={ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(trait.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(trait.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {trait.trait_translation.name}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Image
                                                                        src={trait?.trait_icon?.image || noImage}
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
                                                            <CreateTraitFormModal headerCount={headerCount} />
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