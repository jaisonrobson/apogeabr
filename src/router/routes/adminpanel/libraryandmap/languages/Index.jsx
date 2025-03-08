import React, { useEffect, Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import { compareDates } from 'util/intl'
import { typeAsDescription } from 'util/string'

import { I18nContext } from 'contexts'

import noImage from 'images/layout/generic/noImage.png'

import {
    Table,
    Row,
    Col,
    MarbleTabletBoard,
    Container,
    TitleH2,
    ExpandableImageModal,
    UserImageForm,
    ConnectedPaginatedTable,
    Icon,
    Div,
    Modal,
    Span,
    Button,
    CreateLanguageForm,
    LanguageFormInputs,
    Image,
    HR,
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
                                                            <Modal
                                                                Component={AddRecordTableCell}
                                                                componentProps={{ headerCount }}
                                                                centered
                                                                backdrop="static"
                                                                size="lg"
                                                            >
                                                                {({ isOpen, toggle }) => (
                                                                    <CreateLanguageForm
                                                                        defaultValues={{
                                                                            name: "",
                                                                            image: null,
                                                                            countrycode: "",
                                                                        }}
                                                                    >
                                                                        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) => (
                                                                            <Fragment>
                                                                                <Modal.Header light display="flex" alignItems="center" justifyContent="center">
                                                                                    <TitleH2 useTextShadow light>Novo Idioma</TitleH2>
                                                                                </Modal.Header>
                                                                                <Modal.Body light>
                                                                                    <LanguageFormInputs register={register} setValue={setValue} errors={errors} backendErrors={backendErrors} />
                                                                                </Modal.Body>
                                                    
                                                                                <Modal.Footer light>
                                                                                    <Container
                                                                                        display="flex"
                                                                                        flexDirection="row"
                                                                                        justifyContent="space-between"
                                                                                        alignItems="center"
                                                                                        width="100%"
                                                                                    >
                                                                                        <Button color="white" onClick={toggle}>Cancelar</Button>

                                                                                        <CreateLanguageForm.SubmitButton color="white" />
                                                                                    </Container>

                                                                                    <Container
                                                                                        display="flex"
                                                                                        flexDirection="row"
                                                                                        justifyContent="space-between"
                                                                                        alignItems="center"
                                                                                        width="100%"
                                                                                    >
                                                                                        <CreateLanguageForm.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                                                                    </Container>
                                                                                </Modal.Footer>
                                                                            </Fragment>
                                                                        )}
                                                                    </CreateLanguageForm>
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
