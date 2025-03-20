import React, { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import axios from 'axios'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { urlToFile } from 'util/image'

import ROUTES from 'router/routes'

import {
    Modal,
    Button, 
    Icon,
    Span,
    UpdateLanguageForm,
    LanguageFormInputs,
    Container,
    TitleH2,
    Row,
    Col,
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

const Update = ({ locale }) => (
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
                    image: locale.image ? urlToFile(locale.image) : null,
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
                            <Row>
                                <Col>
                                    <TitleH2 useTextShadow light>Editar Idioma</TitleH2>
                                </Col>
                            </Row>                            
                        </Modal.Header>

                        <Modal.Body light>
                            <LanguageFormInputs register={register} setValue={setValue} errors={errors} backendErrors={backendErrors} reloadInformation={!isLoadingLateValues} />
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
)

export default Update