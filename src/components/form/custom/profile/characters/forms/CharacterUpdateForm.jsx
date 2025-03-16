import React from 'react'
import * as z from 'zod'

import ROUTES from 'router/routes'

import { FetcherForm, Input } from 'components'

import { characterNumberValidation, userImageValidation } from 'validations'

const characterUpdateValidationSchema = z.object({
    image: userImageValidation.nullable(),
    level: characterNumberValidation,
    health: characterNumberValidation,
    mana: characterNumberValidation,
    magic: characterNumberValidation,
    damage: characterNumberValidation,
    movespeed: characterNumberValidation,
    weapon_skill: characterNumberValidation,
    attack_speed: characterNumberValidation,
    hp_regen: characterNumberValidation,
    mp_regen: characterNumberValidation,
    range: characterNumberValidation,
    armor: characterNumberValidation,
    defense: characterNumberValidation,
    capacity: characterNumberValidation,
})

const SubmitButton = (props) => (
    <Input
        light
        minWidth="280px"
        width="400px"
        value='Atualizar Personagem'
        type="submit"
        marginTop='15px'
        backgroundColor='#00000010'
        border='2px solid gray'
        onHover={{
            animation: {
                property: 'loginButtonAnimation 0.5s linear 0s infinite alternate',
                corpse: `@keyframes loginButtonAnimation {
                    0%  {transform: scale3d(1,1,1);}
                    100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                }`
            }
        }}
        {...props}
    />
)

const CharacterUpdateForm = ({ children, characterId, ...props }) => {    
    const onBeforeSubmit = (data) => ({ ...data, character_id: characterId })

    return (
        <FetcherForm
            allowedProperties={[
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
                'capacity',
                'image',
                'character_id'
            ]}
            enforceProperties={['character_id']}
            validationSchema={characterUpdateValidationSchema}
            action={ROUTES.USER_PROFILE_CHARACTERS_UPDATE_SUBMIT.path}
            defaultForm={false}
            onBeforeSubmit={onBeforeSubmit}
            {...props}
        >
            {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
                children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
        </FetcherForm>
    )
}

CharacterUpdateForm.SubmitButton = SubmitButton
CharacterUpdateForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default CharacterUpdateForm