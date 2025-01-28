import React from 'react'
import { useRouteLoaderData, useLocation } from 'react-router-dom'
import _ from 'lodash'

import {
    CharacterUpdateForm,
    ImageInput,
    CharacterCreationMainInputs,
    CharacterPersistanceSecondaryInputs,
    StoneTabletTwoBoard,
    Container,
    Row,
    Col,
} from 'components'

const CharactersUpdate = () => {
    const { characters } = useRouteLoaderData("characters")
    const { state } = useLocation()

    const actualUpdatingCharacter = () => _.find(characters, { id: state.characterId })

    const destructureCharacterDefaultValues = () => {
        const values = actualUpdatingCharacter()

        console.log(values)

        let result = _.pick(
            values,
            [
                'level',
                'health',
                'mana',
                'magic',
                'damage',
                'movespeed',
                'weapon_skill',
                'attack_speed',
                'hp_regen',
                'mp_regen',
                'range',
                'armor',
                'defense',
                'capacity'
            ]
        )

        result = _.mapValues(result, value => value.toString())

        return { ...result, image: values.image_url }
    }
    
    return (
        <CharacterUpdateForm
            characterId={state.characterId}
            defaultValues={destructureCharacterDefaultValues()}
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
                                <ImageInput
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    backendErrors={backendErrors}
                                    defaultImage={actualUpdatingCharacter().image_url}
                                />
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
                                        <CharacterUpdateForm.SubmitButton width="100%" />

                                        <CharacterUpdateForm.SubmissionInfo fetcher={fetcher} errors={errors} success={backendSuccess} />
                                    </Container>
                                </StoneTabletTwoBoard>
                            </Col>
                        </Row>                    
                    </Col>
                </Row>
            )}
        </CharacterUpdateForm>
    )
}

export default CharactersUpdate
