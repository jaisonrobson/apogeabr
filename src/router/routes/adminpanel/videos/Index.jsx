import React, { Fragment, useContext } from 'react'
import _ from 'lodash'
import { faCertificate, faCheck, faXmark, faPlay } from '@fortawesome/free-solid-svg-icons'

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
    Input,
    Icon,
    CopyableDisabledInput,
    ExpandableVideoModal,
    Button,
} from 'components'

import { getYouTubeThumbnail } from 'util/string'

import CheckboxInput from 'components/form/custom/CheckboxInput'

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
                                                searchEndpoint={`${process.env.REACT_APP_BACKEND_HOST}/videos/search`}
                                                endpoint={`${process.env.REACT_APP_BACKEND_HOST}/videos`}
                                                additionalAllowedProperties={(payload) => _.map(payload, (video) => `validate-${video.id}`)}
                                                additionalValidations={(payload) => {
                                                    const validations = {}
                                                    _.forEach(payload, (video) => {
                                                        validations[`validate-${video.id}`] = booleanValidation
                                                    })
                                                    return validations
                                                }}
                                                formProps={{
                                                    action: ROUTES.USER_ADMIN_PANEL_VIDEOS_VALIDATE_SUBMIT.path,
                                                    defaultValues: (payload) => {
                                                        const defaultValues = {}
                                                        _.forEach(payload, (video) => {
                                                            defaultValues[`validate-${video.id}`] = video.validated
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
                                                                animationName="videoValidationSubmitAnimation"
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
                                                                    URL do Vídeo
                                                                </Table.CellHeader>

                                                                <Table.CellHeader>
                                                                    Vídeo
                                                                </Table.CellHeader>

                                                                <Table.CellHeader>
                                                                    Verificado
                                                                </Table.CellHeader>
                                                            </Table.Row>
                                                        </Table.Header>

                                                        <Table.Body>
                                                            {_.map(payload, (video, index) => (
                                                                <Table.Row key={video.id} light>
                                                                    <Table.Cell>
                                                                        {video.id}
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
                                                                                    name={`validate-${video.id}`}
                                                                                    register={register}
                                                                                    defaultChecked={video.validated}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {formatDateTime(video.created_at)}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {video?.user_name || '-'}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {formatDateTime(video.updated_at)}
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        <CopyableDisabledInput
                                                                            value={video.link}
                                                                        />
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        <Button
                                                                            as={ExpandableVideoModal}
                                                                            width="50px"
                                                                            height="30px"
                                                                            border="none"
                                                                            image={getYouTubeThumbnail(video.link)}
                                                                            url={video.link}
                                                                            videoProps={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                border: "none",
                                                                            }}
                                                                        />
                                                                    </Table.Cell>

                                                                    <Table.Cell>
                                                                        {video.validated
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