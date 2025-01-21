import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import {
    Row,
    CharacterBoard,
    CreateCharacterButton,
} from 'components'

const Characters = () => {
    const { user } = useRouteLoaderData("root")
    
    return (
        <Row justifyContent="center">
            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />

            <CreateCharacterButton />
        </Row>
    )
}

export default Characters
