import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

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

import {
    UserConfigurationForm,
    UserConfigurationImageInput,
    UserConfigurationInformationInputs,
    UserConfigurationSensitiveInputs,
    StoneTabletTwoBoard,
    StoneTabletThreeBoard,
    StoneTabletFourBoard,
    Container,
    Row,
    Col,
    Span,
    Icon,
    Svg,
    Image,
} from 'components'

const CharacterBoard = () => {
    const { user } = useRouteLoaderData("root")

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
            <Row>
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
                    <Image src={user?.image} width="125px" borderRadius="300px" marginBottom="10px" marginRight="4px" />
                </Col>
            </Row>

            <Row padding="15px 0px">
                <StoneTabletFourBoard padding="0px" minWidth="200px">
                    <Row
                        className="unselectable text-gray-100"
                        fontFamily="Retro Computer"
                    >
                        <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Span>Character</Span>
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
                                    <Image width="20px" height="20px" src={RogueClassStatusImage} />
                                </Col>
                            </Row>
                        </Col>

                        <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="10px">
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>0</Span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Span>Rogue</Span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </StoneTabletFourBoard>
            </Row>                
        </Col>
    )
}

const Characters = () => {
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

export default Characters
