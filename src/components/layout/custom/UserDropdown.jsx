import React from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import ROUTES from 'router/routes'

import { Dropdown, Image, Span, Icon } from 'components'

const UserDropdown = ({ togglerProperties = {}, light=false, noProfile = false, noAdmin = false, ...props }) => {
    const navigate = useNavigate()
    const { user } = useRouteLoaderData("root")

    const onEnterAffiliated = () => {
        navigate(ROUTES.USER_PROFILE_AFFILIATED.path)
    }

    const onEnterProfile = () => {
        navigate(ROUTES.USER_PROFILE_OVERVIEW.path)
    }

    const onEnterAdminPanel = () => {
        navigate(ROUTES.USER_ADMIN_PANEL_OVERVIEW.path)
    }

    const onLogout = () => {
        localStorage.removeItem('token')

        navigate(ROUTES.HOME.path, { replace: true })

        window.location.reload()
    }

    return (
        <Dropdown
            backgroundColor={"undefined"}
            color={!light ? "black" : "white"}
            onHover={{
                backgroundColor: "undefined",
                color: !light ? "white" : "black",
            }}
            {...props}
        >
            <Dropdown.Toggler
                style={{
                    margin: 0,
                    padding: 0,
                }}
                width="100%"
                fontSize="12px"
                componentColor="none"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                color={!light ? "black" : "white"}
                backgroundColor="undefined"
                onHover={{
                    backgroundColor: "undefined",
                    color: !light ? "white" : "black",
                }}
                {...togglerProperties}
            >
                <Image
                    src={user?.image || userNoAvatarImage}
                    className="rounded-circle"
                    objectFit="contain"
                    width="35px"
                />

                <Span>{user?.name ? user?.name : 'Usuário'}</Span>

                <Icon icon={faCaretDown} size="xl" color="inherit" marginTop="-4px" />
            </Dropdown.Toggler>

            <Dropdown.Menu className="unselectable" style={{ width: '100%' }}>
                {
                    !noProfile
                    ? (
                        <Dropdown.Item onClick={onEnterProfile}>
                            Perfil
                        </Dropdown.Item>
                    )
                    : null
                }

                {
                    !noAdmin && user.privilege.value >= 5
                    ? (
                        <Dropdown.Item onClick={onEnterAdminPanel}>
                            Painel do Admin
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