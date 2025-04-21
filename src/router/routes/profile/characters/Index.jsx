import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import _ from 'lodash'

import { getClassNicknameByNumber } from 'util/characterClasses'

import {
    Row,
    CharacterBoard,
    CreateCharacterButton,
} from 'components'

const Characters = () => {
    const { user } = useRouteLoaderData("root")
    const { characters } = useRouteLoaderData("characters")

    return (
        <Row justifyContent="center">
            {
                characters.map(character => (
                    <CharacterBoard
                        key={character.id}
                        characterInfo={{
                            id: character.id,
                            image: character.image_url,
                            name: _.truncate(character.name, {
                                length: 10,
                                omission: '...'
                              }),
                            level: character.level,
                            health: character.health,
                            mana: character.mana,
                            magic: character.magic,
                            damage: character.damage,
                            moveSpeed: character.movespeed,
                            weaponSkill: character.weapon_skill,
                            attackSpeed: character.attack_speed,
                            hpRegen: character.hp_regen,
                            mpRegen: character.mp_regen,
                            range: character.range,
                            armor: character.armor,
                            defense: character.defense,
                            capacity: character.capacity,
                            classNickname: _.truncate(getClassNicknameByNumber(character.classtype), {
                                length: 8,
                                omission: '...'
                              }),
                            classtype: character.classtype,
                        }}
                        codeInfo={character.unique_validation_code}
                    />
                ))
            }

            <CreateCharacterButton />
        </Row>
    )
}

export default Characters
