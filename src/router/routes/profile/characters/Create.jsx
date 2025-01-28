import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import {
    CharacterCreationForm,
    ImageInput,
    CharacterCreationMainInputs,
    CharacterPersistanceSecondaryInputs,
    StoneTabletTwoBoard,
    Container,
    Row,
    Col,
} from 'components'

const CharactersCreate = () => {
    const { user } = useRouteLoaderData("root")

    return (
        <CharacterCreationForm
            defaultValues={{
                image: null,
                name: '',
                creation_date: "",
                classtype: 0,
                level: "0",
                health: "0",
                mana: "0",
                magic: "0",
                damage: "0",
                movespeed: "0",
                weapon_skill: "0",
                attack_speed: "0",
                hp_regen: "0",
                mp_regen: "0",
                range: "0",
                armor: "0",
                defense: "0",
                capacity: "0",
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
                                <ImageInput register={register} setValue={setValue} errors={errors} backendErrors={backendErrors} />
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
                                <CharacterCreationMainInputs register={register} errors={errors} setValue={setValue} backendErrors={backendErrors} />
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
                                <CharacterPersistanceSecondaryInputs register={register} errors={errors} backendErrors={backendErrors} />
                            </Container>
                        </StoneTabletTwoBoard>
                    </Col>

                    <Col xs="12">
                        <Row display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Col
                                xs="4"
                                minWidth="450px"
                            >
                                <StoneTabletTwoBoard>
                                    <Container
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                        className="unselectable"
                                    >
                                        <CharacterCreationForm.SubmitButton width="100%" />

                                        <CharacterCreationForm.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                    </Container>
                                </StoneTabletTwoBoard>
                            </Col>
                        </Row>                    
                    </Col>
                </Row>
            )}
        </CharacterCreationForm>
    )
}

export default CharactersCreate
