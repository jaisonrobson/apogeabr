import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar as ReactstrapNavbar } from 'reactstrap'

const StyledNavbar = styled(({ backgroundColor, ...props }) => <ReactstrapNavbar {...props} />)`
    transition-timing-function: ease-in;
    transition-duration: 0.5s;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${({ backgroundColor }) => backgroundColor || "#00000020"};
    z-index: 100;
`

const Navbar = ({ children, ...props }) => {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const scroll = () => {
            if (window.scrollY > 100) {
                setIsShow(true)
            } else setIsShow(false)
        }

        window.addEventListener("scroll", scroll)

        return () => window.removeEventListener("scroll", scroll)
    }, [])

    return (
        <StyledNavbar
            fixed="top"
            expand="sm"
            backgroundColor={isShow && "#111"}
            {...props}
        >
            {children({ isShow })}
        </StyledNavbar>
    )
}

export default Navbar