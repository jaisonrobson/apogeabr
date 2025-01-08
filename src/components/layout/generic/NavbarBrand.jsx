import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Logotipo from 'images/layout/generic/logotipo.png'

import ROUTES from 'router/routes'

import { Image } from 'components'

const StyledNavbarBrand = styled(NavLink)`
    color: #d4bf4e;
    font-family: 'Martel';
    font-weight: 1;
    font-size: 30px;
    letter-spacing: 3px;
    text-shadow: 2px 2px 5px #000;

    &:hover,
    &:focus,
    &:active {
        color: #289535;
    }
`

const NavbarBrand = (props) => {
    return (
        <StyledNavbarBrand
            to={ROUTES.HOME.path}
            className="unselectable"
            {...props}
        >
            <Image
                src={Logotipo}
                objectFit="cover"
                width="250px"
                height="60px"
                zIndex="999"
            />
            BR
        </StyledNavbarBrand>
    )
}

export default NavbarBrand
