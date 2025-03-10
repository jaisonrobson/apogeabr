import React, { useEffect, Fragment, useContext } from 'react'
import _ from 'lodash'
import axios from "axios"
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { faSquarePlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import { compareDates } from 'util/intl'
import { typeAsDescription } from 'util/string'
import { getImageBlobDataTransferFromUrl, urlToFile } from 'util/image'

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
    UpdateLanguageForm,
    LanguageFormInputs,
    Image,
    HR,
} from 'components'

const EditRecordButton = (props) => (
    <Button
        color="white"
        backgroundColor='#00000060'
        border='2px solid gray'
        onHover={{
            animation: {
                property: 'languageEditAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes languageEditAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: #FFFA85; border-radius: 8px}
                }`
            }
        }}
        {...props}
    >
        <Icon icon={faPen} />
    </Button>
)

const AddRecordTableCell = ({ headerCount, ...props }) => (
    <Table.Cell
        onHover={{
            backgroundColor: "lightblue",
        }}
        colSpan={headerCount}
        childrenAsFunction
        {...props}
    >
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
                                                                            <Modal
                                                                                Component={EditRecordButton}
                                                                                centered
                                                                                backdrop="static"
                                                                                size="lg"
                                                                            >
                                                                                {({ isOpen, toggle }) => (
                                                                                    <UpdateLanguageForm
                                                                                        localeId={locale.id}
                                                                                        lateLoadingProps={{isOpen}}
                                                                                        lateLoadingTriggers={[{isOpen: true}]}
                                                                                        lateLoadingValues={() => ({
                                                                                            name: locale.name,
                                                                                            image: urlToFile(locale.image),
                                                                                            countrycode: locale.countrycode,
                                                                                        })}
                                                                                        defaultValues={{
                                                                                            name: locale.name,
                                                                                            image: null,
                                                                                            countrycode: locale.countrycode,
                                                                                        }}
                                                                                    >
                                                                                        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess, isLoadingLateValues }) => (
                                                                                            <Fragment>
                                                                                                <Modal.Header light display="flex" alignItems="center" justifyContent="center">
                                                                                                    <TitleH2 useTextShadow light>Editar Idioma</TitleH2>
                                                                                                </Modal.Header>

                                                                                                <Modal.Body light>
                                                                                                    <LanguageFormInputs register={register} setValue={setValue} errors={errors} backendErrors={backendErrors} reloadImage={!isLoadingLateValues} />
                                                                                                </Modal.Body>
                                                                    
                                                                                                <Modal.Footer light>
                                                                                                    <Container
                                                                                                        display="flex"
                                                                                                        flexDirection="row"
                                                                                                        justifyContent="space-between"
                                                                                                        alignItems="center"
                                                                                                        width="100%"
                                                                                                    >
                                                                                                        <Button
                                                                                                            color="white"
                                                                                                            onClick={toggle}
                                                                                                            backgroundColor='#00000060'
                                                                                                            border='2px solid gray'
                                                                                                            onHover={{
                                                                                                                animation: {
                                                                                                                    property: 'languageCancelAnimation 0.5s linear 0s infinite alternate',
                                                                                                                    corpse: `@keyframes languageCancelAnimation {
                                                                                                                        0%  {transform: scale3d(1,1,1);}
                                                                                                                        100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                                                                                                    }`
                                                                                                                }
                                                                                                            }}
                                                                                                        >
                                                                                                            Cancelar
                                                                                                        </Button>

                                                                                                        {!isLoadingLateValues ? (
                                                                                                            <UpdateLanguageForm.SubmitButton
                                                                                                                color="white"
                                                                                                                animationBackgroundColor="#FFFA85"
                                                                                                                animationName="languageEditSubmitAnimation"
                                                                                                                value="Alterar"
                                                                                                            />
                                                                                                        ) : null}                                                                                                        
                                                                                                    </Container>

                                                                                                    <Container
                                                                                                        display="flex"
                                                                                                        flexDirection="row"
                                                                                                        justifyContent="space-between"
                                                                                                        alignItems="center"
                                                                                                        width="100%"
                                                                                                    >
                                                                                                        <UpdateLanguageForm.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                                                                                    </Container>
                                                                                                </Modal.Footer>
                                                                                            </Fragment>
                                                                                        )}
                                                                                    </UpdateLanguageForm>
                                                                                )}
                                                                            </Modal>                                                                            
                                                                        </Col>

                                                                        <Col
                                                                            display="inline-flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            width="25px"
                                                                        >
                                                                            <Button
                                                                                color="white"
                                                                                backgroundColor='#00000060'
                                                                                border='2px solid gray'
                                                                                onHover={{
                                                                                    animation: {
                                                                                        property: 'languageDeleteAnimation 0.5s linear 0s infinite alternate',
                                                                                        corpse: `@keyframes languageDeleteAnimation {
                                                                                            0%  {transform: scale3d(1,1,1);}
                                                                                            100%  {transform: scale3d(1.03,1.03,1.03); background-color: #ED8C8E; border-radius: 8px}
                                                                                        }`
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Icon icon={faTrash} />
                                                                            </Button>
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
                                                                                        <Button
                                                                                            color="white"
                                                                                            onClick={toggle}
                                                                                            backgroundColor='#00000060'
                                                                                            border='2px solid gray'
                                                                                            onHover={{
                                                                                                animation: {
                                                                                                    property: 'languageCancelAnimation 0.5s linear 0s infinite alternate',
                                                                                                    corpse: `@keyframes languageCancelAnimation {
                                                                                                        0%  {transform: scale3d(1,1,1);}
                                                                                                        100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                                                                                    }`
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            Cancelar
                                                                                        </Button>

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
