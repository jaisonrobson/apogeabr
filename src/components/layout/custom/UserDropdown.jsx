import React from 'react'
import { useNavigate } from 'react-router'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { Dropdown, Image, Span, Icon } from 'components'

const UserDropdown = ({ userName }) => {
    const navigate = useNavigate()

    const onEnterProfile = () => {
        navigate('/user/profile/')
    }

    const onLogout = () => {
        localStorage.removeItem('token')

        navigate('/', { replace: true })

        window.location.reload()
    }

    return (
        <Dropdown>
            <Dropdown.Toggler
                nav
            >
                <Image
                    src={userNoAvatarImage}
                    className="rounded-circle"
                    objectFit="contain"
                    width="35px"
                />

                <Span marginLeft="10px" marginRight="5px" className="text-gray-400">{userName}</Span>

                <Icon paddingTop="1px" icon={faCaretDown} />
            </Dropdown.Toggler>

            <Dropdown.Menu>
                <Dropdown.Item onClick={onEnterProfile}>
                    Perfil
                </Dropdown.Item>

                <Dropdown.Item>
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