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
    CreateNewsPostFormModal,
    UpdateNewsPostFormModal,
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
                                            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/news_posts/search`}
                                            endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/news_posts`}
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
                                                                Atualizado por
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Título
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Conteúdo
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Imagem
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (newsPost, index) => (
                                                            <Table.Row key={newsPost.id} light>
                                                                <Table.CellHeader>
                                                                    {`${newsPost.id}`}
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
                                                                            <UpdateNewsPostFormModal newsPost={newsPost} />
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <DeleteRecordModalButton
                                                                                deleteEndpoint={`news_posts/${newsPost.id}`}
                                                                                deleteRoutePath={ROUTES.USER_ADMIN_PANEL_NEWS.path}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(newsPost.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {newsPost?.created_by_name || '-'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(newsPost.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {newsPost?.last_modified_by_name || '-'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {newsPost.news_post_translation?.title || 'Sem título'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {newsPost.news_post_translation?.content?.substring(0, 50) || 'Sem conteúdo'}...
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Image
                                                                        src={newsPost.image || noImage}
                                                                        alt={newsPost.news_post_translation?.title || 'Sem título'}
                                                                        width="50px"
                                                                        height="50px"
                                                                        objectFit="cover"
                                                                        borderRadius="5px"
                                                                    />
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))}

                                                        <Table.Row light>
                                                            <CreateNewsPostFormModal headerCount={headerCount} />
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
