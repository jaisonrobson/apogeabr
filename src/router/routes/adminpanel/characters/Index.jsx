import React, { Fragment, useContext, useEffect } from 'react'
import _ from 'lodash'
import { faCertificate, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

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
    SearchableConnectedPaginatedTable,
    Input,
    Icon,
    CharacterValidationForm,
    CharacterValidationInputs,
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
                                            searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/characters/search`}
                                            endpoint={`${[process.env.REACT_APP_BACKEND_HOST]}/characters`}
                                        >
                                            {({ payload, headerCount }) => (
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
                                                                Usuario
                                                            </Table.CellHeader>

                                                            <Table.CellHeader>
                                                                Nome
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
                                                        {_.map(payload, (character, index) => (
                                                            <Table.Row key={character.id} light>
                                                                <Table.Cell>
                                                                    {character.id}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {formatDateTime(character.creation_date)}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {character?.user_name || '-'}
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Input
                                                                        value={character.name || '-'}
                                                                        readOnly
                                                                        textAlign="center"
                                                                    />                                                                    
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    <Image
                                                                        src={character.image_url || noImage}
                                                                        width="50px"
                                                                        height="50px"
                                                                        objectFit="cover"
                                                                        borderRadius="8px"
                                                                    />
                                                                </Table.Cell>

                                                                <Table.Cell>
                                                                    {character.unique_validation_code.is_verified
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
                                        </SearchableConnectedPaginatedTable>
                                    </Col>
                                </Row>
                            </Container>
                        </MarbleTabletBoard>
                    </Col>
                </Row>

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
                                <Row>
                                    <Col>
                                        <CharacterValidationForm>
                                            {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) => (
                                                <Fragment>
                                                    <CharacterValidationInputs
                                                        register={register}
                                                        errors={errors}
                                                        backendErrors={backendErrors}
                                                        setValue={setValue}
                                                        light
                                                    />

                                                    <CharacterValidationForm.SubmitButton
                                                        color="white"
                                                        animationBackgroundColor="#B8FFC3"
                                                        animationName="characterValidationSubmitAnimation"
                                                        value="Validar"
                                                    />

                                                    <CharacterValidationForm.SubmissionInfo
                                                        fetcher={fetcher}
                                                        success={backendSuccess}
                                                        errors={backendErrors}
                                                    />
                                                </Fragment>
                                            )}
                                        </CharacterValidationForm>
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