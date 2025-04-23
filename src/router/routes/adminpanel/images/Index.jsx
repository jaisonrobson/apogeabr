import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import { faCertificate, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import { I18nContext } from 'contexts'

import { booleanValidation } from 'validations'

import {
    Table,
    Row,
    Col,
    MarbleTabletBoard,
    Container,
    SearchableFormConnectedPaginatedTable,
    Icon,
    CopyableDisabledInput,
    Image,
    Button,
    CheckboxInput,
    ExpandableImageModal,
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
                                        <Fragment>
                                            <SearchableFormConnectedPaginatedTable
                                                light
                                                searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/images/search`}
                                                endpoint={`${process.env.REACT_APP_BACKEND_HOST}/images`}
                                                additionalAllowedProperties={(payload) => _.map(payload, (image) => `validate-${image.id}`)}
                                                additionalValidations={(payload) => {
                                                    const validations = {}
                                                    _.forEach(payload, (image) => {
                                                        validations[`validate-${image.id}`] = booleanValidation
                                                    })
                                                    return validations
                                                }}
                                                formProps={{
                                                    action: ROUTES.USER_ADMIN_PANEL_IMAGES_VALIDATE_SUBMIT.path,
                                                    defaultValues: (payload) => {
                                                        const defaultValues = {}
                                                        _.forEach(payload, (image) => {
                                                            defaultValues[`validate-${image.id}`] = image.validated
                                                        })
                                                        return defaultValues
                                                    }
                                                }}
                                                formChildren={({ fetcher, backendSuccess, backendErrors }) => (
                                                    <Row>
                                                        <Col display="flex" flexDirection="column">
                                                            <SearchableFormConnectedPaginatedTable.SubmitButton
                                                                value="Validar"
                                                                color="white"
                                                                height="70px"
                                                                animationBackgroundColor="#B8FFC3"
                                                                animationName="imageValidationSubmitAnimation"
                                                                marginTop="3rem"
                                                                fontFamily="Retro Computer"
                                                            />

                                                            <SearchableFormConnectedPaginatedTable.SubmissionInfo
                                                                fetcher={fetcher}
                                                                success={backendSuccess}
                                                                errors={backendErrors}
                                                            />
                                                        </Col>
                                                    </Row>
                                                )}
                                            >
                                                {({ payload, headerCount, register, setValue }) => (
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
                                                                    URL da Imagem
                                                                </Table.CellHeader>

                                                                <Table.CellHeader>
                                                                    Imagem
                                                                </Table.CellHeader>

                                                                <Table.CellHeader>
                                                                    Verificado
                                                                </Table.CellHeader>
                                                            </Table.Row>
                                                        </Table.Header>

                                                        <Table.Body>
                                                            {_.map(payload, (image, index) => (
                                                                <Table.Row key={image.id} light>
                                                                    <Table.Cell>
                                                                        {image.id}
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
                                                                                <CheckboxInput 
                                                                                    name={`validate-${image.id}`}
                                                                                    register={register}
                                                                                    defaultChecked={image.validated}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {formatDateTime(image.created_at)}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {image?.user_name || '-'}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {formatDateTime(image.updated_at)}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        <CopyableDisabledInput
                                                                            value={image.image}
                                                                        />
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        <ExpandableImageModal
                                                                            width="80px"
                                                                            height="50px"
                                                                            image={image.image}
                                                                            imageProps={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                borderRadius: "50px",
                                                                                objectFit: 'cover',
                                                                            }}
                                                                            modalProps={{
                                                                                borderRadius: "8px",
                                                                            }}
                                                                        />
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {image.validated
                                                                        ? (
                                                                            <Fragment>
                                                                                <Icon icon={faCertificate} width="30px" height="30px" color="lightgreen" style={{ position: 'absolute' }} />

                                                                                <Icon icon={faCheck} width="20px" height="20px" color="green" style={{ position: 'absolute' }} />
                                                                            </Fragment>
                                                                        )
                                                                        : (
                                                                            <Fragment>
                                                                                <Icon icon={faCertificate} width="30px" height="30px" color="#EE9C9C" style={{ position: 'absolute' }} />

                                                                                <Icon icon={faXmark} width="20px" height="20px" color="red" style={{ position: 'absolute' }} />
                                                                            </Fragment>
                                                                        )}
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            ))}
                                                        </Table.Body>
                                                    </Fragment>
                                                )}
                                            </SearchableFormConnectedPaginatedTable>
                                        </Fragment>
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