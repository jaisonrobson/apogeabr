import React, { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import axios from 'axios'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import {
    Modal,
    Button, 
    Icon,
    Span,
    Table,
    Div,
    Container,
    CreateLanguageForm,
    LanguageFormInputs,
    TitleH2,
} from 'components'

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

const Create = ({ headerCount }) => (
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
)

export default Create