import React from 'react'
import { useNavigate } from 'react-router'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import ROUTES from 'router/routes'

import { Dropdown, Image, Span, Icon } from 'components'

const UserDropdown = ({ userName, togglerProperties = {}, noProfile = false, ...props }) => {
    const navigate = useNavigate()

    const onEnterAffiliated = () => {
        navigate(ROUTES.USER_PROFILE_AFFILIATED.path)
    }

    const onEnterProfile = () => {
        navigate(ROUTES.USER_PROFILE_OVERVIEW.path)
    }

    const onLogout = () => {
        localStorage.removeItem('token')

        navigate(ROUTES.HOME.path, { replace: true })

        window.location.reload()
    }

    return (
        <Dropdown {...props}>
            <Dropdown.Toggler
                style={{
                    margin: 0,
                    padding: 0,
                }}
                width="100%"
                color="black"
                backgroundColor="transparent"
                hoverColor="gray"
                hoverBackgroundColor="transparent"
                hoverOpacity=".5"
                fontSize="12px"
                componentColor="none"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                {...togglerProperties}
            >
                <Image
                    src={userNoAvatarImage}
                    className="rounded-circle"
                    objectFit="contain"
                    width="35px"
                />

                <Span>{userName ? userName : 'Usuário'}</Span>

                <Icon icon={faCaretDown} size="xl" color="inherit" marginTop="-4px" />
            </Dropdown.Toggler>

            <Dropdown.Menu className="unselectable" style={{ width: '100%' }} dark>
                {
                    !noProfile
                    ? (
                        <Dropdown.Item onClick={onEnterProfile}>
                            Perfil
                        </Dropdown.Item>
                    )
                    : null
                }

                <Dropdown.Item onClick={onEnterAffiliated}>
                    Afiliar-se
                </Dropdown.Item>

                <Dropdown.Item divider />

                <Dropdown.Item onClick={onLogout}>
                    Sair
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserDropdown