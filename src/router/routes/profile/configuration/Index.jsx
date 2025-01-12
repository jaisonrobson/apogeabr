import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import {
    UserConfigurationForm,
    UserConfigurationImageInput,
    UserConfigurationInformationInputs,
    UserConfigurationSensitiveInputs,
    StoneTabletTwoBoard,
    Container,
    Row,
    Col,
} from 'components'

const Configuration = () => {
    const { user } = useRouteLoaderData("root")

    return (
        <UserConfigurationForm
            parentContainerProps={{ marginTop: '20rem' }}
            defaultValues={{
                name: user?.name || '',
                email: user?.email || '',
                login: user?.login || '',
                password: '',
                confirmPassword: '',
                phone_number: user?.phone_number || '',
                image: user?.image || null,
            }}
        >
            {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) => (
                <Row padding="0px 2rem" className="row-cols-2" justifyContent="center">
                    <Col xs="12" sm="6" md="4">
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <UserConfigurationImageInput register={register} setValue={setValue} errors={errors} backendErrors={backendErrors} />
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col xs="12" sm="8" md="7" paddingLeft="5rem">
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                className="unselectable"
                            >
                                <UserConfigurationInformationInputs register={register} errors={errors} backendErrors={backendErrors} />
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col xs="12" sm="8" md="7" paddingTop="2rem">
                        <StoneTabletTwoBoard>
                            <Container
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                className="unselectable"
                            >
                                <UserConfigurationSensitiveInputs register={register} errors={errors} backendErrors={backendErrors} />
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col xs="12" paddingTop="2rem">
                        <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Col xs="4">
                                <StoneTabletTwoBoard>
                                    <Container
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                        className="unselectable"
                                    >
                                        <UserConfigurationForm.SubmitButton width="200px" />

                                        <UserConfigurationForm.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                    </Container>
                                </StoneTabletTwoBoard>
                            </Col>
                        </Row>                    
                    </Col>
                </Row>
            )}
        </UserConfigurationForm>
    )
}

export default Configuration
