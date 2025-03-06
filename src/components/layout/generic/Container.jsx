import React from 'react'
import styled from 'styled-components'
import { Container as ReactstrapContainer } from 'reactstrap'

const StyledContainer = styled(({
    gap,
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
    minHeight,
    justifyContent,
    flexDirection,
    flexGrow,
    alignItems,
    display,
    backgroundColor,
    fontFamily,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    position,
    ...props
}) => <ReactstrapContainer {...props} />)`
    ${({ gap }) => gap ? `gap: ${gap};` : ``}

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

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}
    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}

    ${({ position }) => position ? `position: ${position};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}
`

const Container = (props) => <StyledContainer {...props} />

export default Container
