import React from 'react'
import styled from 'styled-components'
import { NavbarBrand as ReactstrapNavbarBrand } from 'reactstrap'

const StyledNavbarBrand = styled(ReactstrapNavbarBrand)`
    color: #FFF;
    font-family: 'Monoton', cursive;
    font-weight: 1;
    font-size: 25px;
    letter-spacing: 3px;
    text-shadow: 2px 2px 5px #000;

    &:hover,
    &:focus,
    &:active {
        color: #FFF;
    }
`

const NavbarBrand = (props) => {
    return (
        <StyledNavbarBrand
            href="/"
            {...props}
        />
    )
}

export default NavbarBrand
