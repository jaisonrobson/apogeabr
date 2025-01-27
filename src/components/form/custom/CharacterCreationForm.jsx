import React from 'react'
import axios from 'axios'
import * as z from 'zod'
import _ from 'lodash'

import ROUTES from 'router/routes'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { FetcherForm, Input } from 'components'

import { characterNumberValidation, characterNameValidation, userImageValidation } from 'validations'

const characterCreationValidationSchema = z.object({
    name: characterNameValidation,
    image: userImageValidation.nullable(),
    creation_date: z.string()
        .refine(date => {
            if (_.isEmpty(date))
                return true

            const newDate = new Date(date)

            return !isNaN(newDate.getDate()) && newDate < new Date()
        }, { message: "A data deve ser valida e estar no passado." })
        .optional(),
    classtype: z.number().min(0, "Valor minimo deve ser 0").max(999999, "Valor maximo atingido"),
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
        minWidth="250px"
        width="400px"
        value='Criar Personagem'
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

const CharacterCreationForm = ({ children, ...props }) => (
    <FetcherForm
        allowedProperties={[
            'name',
            'creation_date',
            'classtype',
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
            'image'
        ]}
        validationSchema={characterCreationValidationSchema}
        action={ROUTES.USER_PROFILE_CHARACTERS_CREATE_SUBMIT.path}
        defaultForm={false}
        {...props}
    >
        {({ register, errors, backendErrors, fetcher, setValue, backendSuccess }) =>
            children({ register, errors, backendErrors, fetcher, setValue, backendSuccess })}
    </FetcherForm>
)

CharacterCreationForm.SubmitButton = SubmitButton
CharacterCreationForm.SubmissionInfo = FetcherForm.SubmissionInfo

export default CharacterCreationForm