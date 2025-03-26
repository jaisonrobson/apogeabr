import React, { Fragment, useState, useEffect, useContext } from 'react'
import _ from 'lodash'

import { loadAction } from 'util/axios'
import { withFormDataContext, FormDataContext } from 'contexts'

import {
    Modal,
    Button,
    Container,
    TitleH2,
    Row,
    Col,
    RecordForm,
} from 'components'

const ErrorDisplay = ({ error }) => !error ? null : (
    <Row>
        <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
            { error }
        </Col>
    </Row>
)

const RecordFormModal = ({
    title = "Novo registro",
    modalComponent = Button,
    modalComponentProps = {},
    formComponent: FormComponent = RecordForm,
    formComponentProps = {},
    doFormLateLoadInformations = false,
    inputsComponent: InputsComponent = () => null,
    inputsComponentExtraProps = {},
    cancelButtonProps = {},
    submitButtonProps = {},
    fetchDynamicFields = false,
    fetchingRequests = [{
        actionMethod: "GET",
        actionRoute: ``
    }],
    fetchingRequestHelpers = [(data) => data.route], // Auxilia na criacao das requisicoes interdependentes subsequentes
    fetchingPayloadHelpers = [(data) => data.payload], // Auxilia na evolucao do payload
    fetchingDynamicFieldsHelpers = undefined, // Auxilia na criacao dos campos dinamicos utilizando as informacoes finalizadas de payload
    fetchingDynamicFieldsHelper = () => ({}), // Auxilia na criacao dos campos dinamicos utilizando as informacoes finalizadas de payload
    light=false
}) => {
    const { isReloadingData, disableReloadData, lastFormValuesSnapshot } = useContext(FormDataContext)
    const [temporaryFields, setTemporaryFields] = useState({})
    const [dynamicFields, setDynamicFields] = useState({})
    const [fetchingPayload, setFetchingPayload] = useState({})
    const [isLoadingFields, setIsLoadingFields] = useState(true)
    const [errorOnLoad, setErrorOnLoad] = useState(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (fetchDynamicFields && isModalOpen || isReloadingData) {
            const fetchData = async () => {
                let newDynamicFields = {}
                let accumulatedPayload = {}
                let foundError = false

                //Execução das requisições de forma sequencial e acumulo do payload sequencialmente
                for (let idx = 0; idx < fetchingRequests.length; idx++) {
                    const request = fetchingRequests[idx]
                
                    const result = await loadAction({
                        actionMethod: request.actionMethod,
                        actionRoute: fetchingRequestHelpers[idx]({ route: request.actionRoute, payload: accumulatedPayload })
                    })
                
                    if (result?.error) {
                        setErrorOnLoad(result.error)
                        foundError = true
                        break // Interrompe a sequência se houver erro
                    }
                
                    accumulatedPayload = fetchingPayloadHelpers[idx]({
                        accumulatedPayload: accumulatedPayload,
                        payload: result.payload,
                        ordem: idx
                    })
                }

                //Iteracao do payload acumulado para criação dos campos dinamicos
                if (!foundError) {
                    let currentDynamicFieldHelper = 0

                    _.each(accumulatedPayload, (collective, key) => {
                        newDynamicFields = {
                            ...(
                                    fetchingDynamicFieldsHelper
                                        ? fetchingDynamicFieldsHelper(collective)
                                        : fetchingDynamicFieldsHelpers[currentDynamicFieldHelper](collective)
                                ),
                            ...newDynamicFields
                        }

                        currentDynamicFieldHelper++
                    })
                    
                    setFetchingPayload(accumulatedPayload)
                    setDynamicFields(newDynamicFields)
                    setIsLoadingFields(false)
                }

                disableReloadData()
            }
    
            fetchData()
        }        
    }, [isModalOpen, isReloadingData])

    const onOpenModal = () => {
        setIsModalOpen(oldValue => !oldValue)
    }

    return (
        <Modal
            Component={modalComponent}
            componentProps={modalComponentProps}
            onOpen={onOpenModal}
            centered
            backdrop="static"
            size="lg"
        >
            {({ isOpen, toggle }) => {
                if (isLoadingFields) return null
                if (errorOnLoad) return <ErrorDisplay error={errorOnLoad} />

                return (
                    <FormComponent
                        onSubmit={() => toggle()}
                        onAfterLateLoadValues={(reset) => reset(lastFormValuesSnapshot)}
                        {...formComponentProps({ dynamicFields, temporaryFields, isOpen, fetchingPayload })}
                    >
                        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess, isLoadingLateValues }) => (
                            <Fragment>
                                <Modal.Header light={light} display="flex" alignItems="center" justifyContent="center">
                                    <Row>
                                        <Col>
                                            <TitleH2 useTextShadow light={light}>{title}</TitleH2>
                                        </Col>
                                    </Row>
                                </Modal.Header>

                                <Modal.Body light={light}>
                                    <InputsComponent
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        backendErrors={backendErrors}
                                        isLoadingLateValues={isLoadingLateValues}
                                        dynamicFields={dynamicFields}
                                        temporaryFields={temporaryFields}
                                        doFormLateLoadInformations={doFormLateLoadInformations}
                                        setTemporaryFields={setTemporaryFields}
                                        {...inputsComponentExtraProps}
                                    />
                                </Modal.Body>

                                <Modal.Footer light={light}>                                
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
                                                    property: 'recordCancelAnimation 0.5s linear 0s infinite alternate',
                                                    corpse: `@keyframes recordCancelAnimation {
                                                    0%  {transform: scale3d(1,1,1);}
                                                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                                                }`
                                                }
                                            }}
                                            {...cancelButtonProps}
                                        >
                                            Cancelar
                                        </Button>

                                        {!isLoadingLateValues ? (
                                            <FormComponent.SubmitButton {...submitButtonProps} />
                                        ) : null}
                                    </Container>

                                    <Container
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <FormComponent.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                    </Container>
                                </Modal.Footer>
                            </Fragment>
                        )}
                    </FormComponent>
                )
            }}
        </Modal>
    )
}

export default withFormDataContext(RecordFormModal)