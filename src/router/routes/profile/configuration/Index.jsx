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
                <Row className="row-cols-2" justifyContent="center" alignItems="center" gap="2rem">
                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="2"
                        minWidth="400px"
                    >
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

                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="4"
                        minWidth="600px"
                    >
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

                    <Col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="6"
                        xl="4"
                        xxl="6"
                        minWidth="600px"
                    >
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

                    <Col xs="12">
                        <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Col
                                xs="3"
                                minWidth="350px"
                            >
                                <StoneTabletTwoBoard>
                                    <Container
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                        className="unselectable"
                                    >
                                        <UserConfigurationForm.SubmitButton width="100%" />

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
