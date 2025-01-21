import React from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

import CharacterPortraitImage from 'images/layout/profile/characters/character_portrait.jpg'

import {
    StoneTabletFourBoard,
    Row,
    Col,
    Span,
    Icon,
    Image,
    Collapse,
    HoverableButton,
} from 'components'

const CharacterPortrait = ({ image, ...props }) => (
    <Row {...props}>
        <Col
            backgroundImage={`url(${CharacterPortraitImage})`}
            backgroundPosition="center"
            backgroundSize="100% 100%"
            minHeight="200px"
            minWidth="200px"
            maxHeight="200px"
            maxWidth="200px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Icon icon={faPlus} width="125px" height="125px" marginBottom="10px" marginRight="2px" color="#FFFFFF90" />
        </Col>
    </Row>
)

const CreateCharacterButton = () => {

    return (
        <Col
            xs="12"
            sm="6"
            md="2"
            margin="0px 50px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <HoverableButton to={ROUTES.USER_PROFILE_CHARACTERS_CREATE.path} >
                <CharacterPortrait />
            </HoverableButton>
        </Col>
    )
}

export default CreateCharacterButton
