import React, { useEffect, Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import ROUTES from 'router/routes'

import { compareDates } from 'util/intl'
import { typeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import {
    Table,
    Row,
    Col,
    MarbleTabletBoard,
    Container,
    TitleH2,
    ExpandableImageModal,
    UserImageForm,
    ImageInput,
    ConnectedPaginatedTable,
} from 'components'

const Overview = () => {
    const { formatDateTime, translate } = useContext(I18nContext)
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
                                        <ConnectedPaginatedTable light endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/subscriptions`}>
                                            {({ payload, isLoading }) => (
                                                <Fragment>
                                                    <Table.Header>
                                                        <Table.Row light>
                                                            <Table.CellHeader>
                                                                #
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Criação
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Última atualização
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Status
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Tipo
                                                            </Table.CellHeader>
                                                            
                                                            <Table.CellHeader>
                                                                Ultimo pagamento bem sucedido
                                                            </Table.CellHeader>
                                                        </Table.Row>
                                                    </Table.Header>

                                                    <Table.Body>
                                                        {_.map(payload, (subscription, index) => (
                                                            <Table.Row key={subscription.id}>
                                                                <Table.CellHeader>
                                                                    {subscription.id}
                                                                </Table.CellHeader>

                                                                <Table.Cell>
                                                                    {formatDateTime(subscription.created_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(subscription.updated_at)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {translate(subscription.status)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {translate(typeAsDescription(subscription.level))}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {compareDates(subscription.last_successful_payment_date, "1970-01-01T00:00:00.000Z", (one, two) => one <= two) ? translate("never") : formatDateTime(subscription.last_successful_payment_date)}
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        ))}
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

export default Overview
