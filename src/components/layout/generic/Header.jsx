import React from 'react'
import styled from 'styled-components'

/* eslint-disable jsx-a11y/heading-has-content */
const StyledHeader = styled(({
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
    width,
    height,
    justifyContent,
    flexDirection,
    alignItems,
    display,
    backgroundColor,
    fontFamily,
    textAlign,
    HeaderComponent,
    ...props
}) => <HeaderComponent {...props} />)`    
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `padding-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}
`

const Component = (props) => <h2 {...props} />
const Header = (props) => <StyledHeader HeaderComponent={Component} {...props} />

export default Header
