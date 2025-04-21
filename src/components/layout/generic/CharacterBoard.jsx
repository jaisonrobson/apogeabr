import React, { useContext, Fragment } from 'react'
import { redirect } from 'react-router-dom'
import axios from 'axios'
import { faPenToSquare, faTrashCan, faCertificate, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import ROUTES from 'router/routes'

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

import { CLASSES_NICKNAMES } from 'util/characterClasses'

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
    Modal,
    Button,
    Input,
} from 'components'

const getIconByClasstype = (classtype) => {
    switch (classtype) {
        case 1:
            return KnightClassStatusImage

        case 2:
            return RogueClassStatusImage

        case 3:
            return MageClassStatusImage
    
        default:
            return SquireClassStatusImage
    }
}

const CharacterPortrait = ({ image, isVerified, ...props }) => (
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

            {
                isVerified
                    ? (
                        <Fragment>
                            <Icon icon={faCertificate} width="30px" height="30px" color="lightgreen" style={{ position: 'absolute', marginLeft: '8rem', marginTop: '8rem' }} />

                            <Icon icon={faCheck} width="20px" height="20px" color="green" style={{ position: 'absolute', marginLeft: '8rem', marginTop: '8rem' }} />
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Icon icon={faCertificate} width="30px" height="30px" color="#EE9C9C" style={{ position: 'absolute', marginLeft: '8rem', marginTop: '8rem' }} />

                            <Icon icon={faXmark} width="20px" height="20px" color="red" style={{ position: 'absolute', marginLeft: '8rem', marginTop: '8rem' }} />
                        </Fragment>
                    )
            }
        </Col>
    </Row>
)

const CharacterDeleteButton = (props) => (
    <HoverableButton {...props}>
        <Icon icon={faTrashCan} />
    </HoverableButton>
)

const CharacterOptions = ({ characterId }) => {
    const onDelete = async () => {
        try {
            const response = await axios.delete(`${[process.env.REACT_APP_BACKEND_HOST]}/characters/${characterId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            redirect(`${ROUTES.USER_PROFILE_CHARACTERS.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)

            return window.location.reload()
        } catch (error) {
            const resultingError = error?.response?.data || { message: error.message }

            redirect(`${ROUTES.USER_PROFILE_CHARACTERS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)

            return window.location.reload()
        }
    }

    return (
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
                <HoverableButton to={ROUTES.USER_PROFILE_CHARACTERS_UPDATE.path} navigationOptions={{ replace: true, state: { characterId } }}>
                    <Icon icon={faPenToSquare} />
                </HoverableButton>

                <Modal Component={CharacterDeleteButton}>
                    {({ isOpen, toggle }) => (
                        <Fragment>
                            <Modal.Body>
                                <Span fontFamily="Arial" fontSize="15px">
                                    Voce deseja realmente remover o personagem?

                                    Esta ação é irreversível e você terá que validar o personagem novamente caso voce o recrie.
                                </Span>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={onDelete}>Sim</Button>

                                <Button onClick={toggle}>Não</Button>
                            </Modal.Footer>
                        </Fragment>
                    )}
                </Modal>
            </Col>
        </Row>
    )
}

const CharacterBoard = ({
    characterInfo = {
        id: -1,
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
        classtype: 0,
    },
    codeInfo = {
        code: "none",
        is_verified: false,
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
                    isVerified={codeInfo.is_verified}
                />

                <Collapse.Content width="100%">
                    <CharacterOptions characterId={characterInfo.id} />

                    <Row>
                        <Col>
                            <Input
                                value={codeInfo.code}
                                readOnly
                                textAlign="center"
                            />
                        </Col>
                    </Row>

                    <Row padding="10px 0px" transition="0.5s">
                        <StoneTabletFourBoard padding="0px 24px" minWidth="250px" transition="0.5s">
                            <Row
                                className="unselectable text-gray-100"
                                fontFamily="Retro Computer"
                            >
                                <Col display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <Span textAlign="center">{characterInfo.name}</Span>
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
                                            <Image width="20px" height="20px" src={getIconByClasstype(characterInfo.classtype)} />
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
