import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar as ReactstrapNavbar } from 'reactstrap'

const StyledNavbar = styled(({
    backgroundColor,
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    ...props
}) => <ReactstrapNavbar {...props} />)`
    transition-duration: 0.5s;
    background-color: ${({ backgroundColor }) => backgroundColor || "#00000020"};
    z-index: 100;

    ${({ padding }) => padding ? `padding: ${padding};` : `padding: 10px 20px;`}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}
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