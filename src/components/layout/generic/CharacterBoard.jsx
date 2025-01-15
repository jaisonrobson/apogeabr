import React, { useContext } from 'react'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import LevelStatusImage from 'images/layout/generic/icons/level.png'
import HealthStatusImage from 'images/layout/generic/icons/health.png'
import ManaStatusImage from 'images/layout/generic/icons/mana.png'
import MagicStatusImage from 'images/layout/generic/icons/magic.png'
import DamageStatusImage from 'images/layout/generic/icons/damage.png'
import MoveSpeedStatusImage from 'images/layout/generic/icons/move_speed.png'
import WeaponSkillStatusImage from 'images/layout/generic/icons/weapon_skill.png'
import AttackSpeedStatusImage from 'images/layout/generic/icons/attack_speed.png'
import HpRegenStatusImage from 'images/layout/generic/icons/hp_regen.png'
import MpRegenStatusImage from 'images/layout/generic/icons/mp_regen.png'
import RangeStatusImage from 'images/layout/generic/icons/range.png'
import ArmorStatusImage from 'images/layout/generic/icons/armor.png'
import DefenseStatusImage from 'images/layout/generic/icons/defense.png'
import CapacityStatusImage from 'images/layout/generic/icons/capacity.png'
import RogueClassStatusImage from 'images/layout/generic/icons/rogue_class.png'
import MageClassStatusImage from 'images/layout/generic/icons/mage_class.png'
import KnightClassStatusImage from 'images/layout/generic/icons/knight_class.png'
import SquireClassStatusImage from 'images/layout/generic/icons/squire_class.png'

import CharacterPortraitImage from 'images/layout/profile/characters/character_portrait.jpg'
import NoAvatar from 'images/layout/user/userNoAvatar.png'

import { withFlagContext, FlagContext } from 'contexts'

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

const getIconByClassNickname = (iconNickname) => {
    switch (iconNickname) {
        case "Knight":
            return KnightClassStatusImage

        case "Mage":
            return MageClassStatusImage

        case "Rogue":
            return RogueClassStatusImage
    
        default:
            return SquireClassStatusImage
    }
}

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
            <Image src={image} width="125px" borderRadius="300px" marginBottom="15px" marginRight="4px" />
        </Col>
    </Row>
)

const CharacterOptions = ({ image }) => (
    <Row justifyContent="center">
        <Col
            minHeight="50px"
            maxHeight="50px"
            minWidth="200px"
            maxWidth="200px"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="15px"
        >
            <HoverableButton>
                <Icon icon={faPenToSquare} />
            </HoverableButton>

            <HoverableButton>
                <Icon icon={faTrashCan} />
            </HoverableButton>
        </Col>
    </Row>
)

const CharacterBoard = ({
    characterInfo = {
        image: NoAvatar,
        name: 'Character',
        level: 0,
        health: 0,
        mana: 0,
        magic: 0,
        damage: 0,
        moveSpeed: 0,
        weaponSkill: 0,
        attackSpeed: 0,
        hpRegen: 0,
        mpRegen: 0,
        range: 0,
        armor: 0,
        defense: 0,
        capacity: 0,
        classNickname: 'Squire',
    },
}) => {
    const { isOpen, setIsOpen } = useContext(FlagContext)
    const toggle = () => setIsOpen(!isOpen)

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
            <Collapse
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Collapse.Button
                    Component={CharacterPortrait}
                    image={characterInfo.image}
                    cursor="pointer"
                    onHover={{
                        opacity: '0.5',
                        animation: {
                            property: 'hoverableAnimation 0.5s linear 0s infinite alternate',
                            corpse: `@keyframes hoverableAnimation {
                                0%  {transform: scale3d(1,1,1);}
                                100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                            }`
                        }
                    }}
                    opacity="1"
                />

                <Collapse.Content width="100%">
                    <CharacterOptions />

                    <Row padding="10px 0px" transition="0.5s">
                        <StoneTabletFourBoard padding="0px 24px" minWidth="250px" transition="0.5s">
                            <Row
                                className="unselectable text-gray-100"
                                fontFamily="Retro Computer"
                            >
                                <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <Span>{characterInfo.name}</Span>
                                </Col>
                            </Row>

                            <Row
                                className="row-cols-2 unselectable text-gray-100"
                                fontFamily="Retro Computer"
                                padding="1rem 0px"
                            >
                                <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="10px">
                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={LevelStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={HealthStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={ManaStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={MagicStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={DamageStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={MoveSpeedStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={WeaponSkillStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={AttackSpeedStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={HpRegenStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={MpRegenStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={RangeStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={ArmorStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={DefenseStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={CapacityStatusImage} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Image width="20px" height="20px" src={getIconByClassNickname(characterInfo.classNickname)} />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="10px">
                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.level}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.health}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.mana}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.magic}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.damage}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.moveSpeed}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.weaponSkill}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.attackSpeed}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.hpRegen}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.mpRegen}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.range}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.armor}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.defense}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.capacity}</Span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Span>{characterInfo.classNickname}</Span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </StoneTabletFourBoard>
                    </Row>
                </Collapse.Content>
            </Collapse>
        </Col>
    )
}

export default CharacterBoard
