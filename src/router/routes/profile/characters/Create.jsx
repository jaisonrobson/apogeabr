import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import {
    Row,
    CharacterBoard,
} from 'components'

const CharactersCreate = () => {
    const { user } = useRouteLoaderData("root")
    
    return (
        <Row justifyContent="center">
            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />

            <CharacterBoard />
        </Row>
    )
}

export default CharactersCreate
