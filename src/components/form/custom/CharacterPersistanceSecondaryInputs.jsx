import React, { Fragment } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import { FormattedInput } from 'components'

const CharacterPersistanceSecondaryInputs = ({ register, errors, backendErrors, ...props }) => (
    <Fragment>
        <FormattedInput
            register={register}
            name="level"
            label="Nível:"
            errorMessage={errors?.level?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="health"
            label="Vida:"
            errorMessage={errors?.health?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="mana"
            label="Mana:"
            errorMessage={errors?.mana?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="magic"
            label="Magia:"
            errorMessage={errors?.magic?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="damage"
            label="Dano:"
            errorMessage={errors?.damage?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="movespeed"
            label="Velocidade Movimento:"
            errorMessage={errors?.movespeed?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="weapon_skill"
            label="Habilidade Arma:"
            errorMessage={errors?.weapon_skill?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="attack_speed"
            label="Velocidade Ataque:"
            errorMessage={errors?.attack_speed?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="hp_regen"
            label="Regeneração HP:"
            errorMessage={errors?.hp_regen?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="mp_regen"
            label="Regeneração Mana:"
            errorMessage={errors?.mp_regen?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="range"
            label="Alcance:"
            errorMessage={errors?.range?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="armor"
            label="Armadura:"
            errorMessage={errors?.armor?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="defense"
            label="Defesa:"
            errorMessage={errors?.defense?.message}
            type="number"
            fontFamily="arial"
        />

        <FormattedInput
            register={register}
            name="capacity"
            label="Capacidade:"
            errorMessage={errors?.capacity?.message}
            type="number"
            fontFamily="arial"
        />

    </Fragment>
)

export default CharacterPersistanceSecondaryInputs