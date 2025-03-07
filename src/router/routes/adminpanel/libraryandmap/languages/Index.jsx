import React, { useEffect, Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

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
    Icon,
    Div,
    Modal,
    Span,
    Button,
} from 'components'

const AddRecordTableCell = ({ headerCount, ...props }) => (
    <Table.Cell colSpan={headerCount} childrenAsFunction {...props}>
        {({ isHovered }) => (
            <Div
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="15px"                                                                    
            >
                <Icon
                    icon={faSquarePlus}
                    color={isHovered ? "black" : "white"}
                />

                Adicionar novo registro
            </Div>
        )}
    </Table.Cell>
)

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
                                                                Código
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
                                                                    Ações
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
                                                            </Table.Row>
                                                        ))}

                                                        <Table.Row light>
                                                            <Modal
                                                                Component={AddRecordTableCell}
                                                                componentProps={{ headerCount }}
                                                                centered
                                                                backdrop="static"
                                                            >
                                                                {({ isOpen, toggle }) => (
                                                                    <Fragment>
                                                                        <Modal.Body>
                                                                            <Span fontFamily="Arial" fontSize="15px">
                                                                                Voce deseja realmente remover o personagem?
                                            
                                                                                Esta ação é irreversível e você terá que validar o personagem novamente caso voce o recrie.
                                                                            </Span>
                                                                        </Modal.Body>
                                            
                                                                        <Modal.Footer>
                                                                            <Container
                                                                                display="flex"
                                                                                flexDirection="row"
                                                                                justifyContent="space-between"
                                                                                alignItems="center"
                                                                                width="100%"
                                                                            >
                                                                                    <Button color="white" onClick={toggle}>Cancelar</Button>

                                                                                    <Button color="white" onClick={() => {}}>Cadastrar</Button>
                                                                            </Container>
                                                                        </Modal.Footer>
                                                                    </Fragment>
                                                                )}
                                                            </Modal>                                                            
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

export default Overview
