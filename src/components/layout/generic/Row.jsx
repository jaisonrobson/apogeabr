import React from 'react'
import styled from 'styled-components'
import { Row as ReactstrapRow } from 'reactstrap'

const StyledRow = styled(({
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
    boxShadow,
    backgroundColor,
    backgroundImage,
    backgroundSize,
    backgroundRepeat,
    backgroundPosition,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    width,
    height,
    minHeight,
    justifyContent,
    flexDirection,
    flexGrow,
    alignItems,
    display,
    position,
    textAlign,
    ...props
}) => <ReactstrapRow {...props} />)`
    ${({ position }) => position ? `position: ${position};` : ``}

    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}

    ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ``}

    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}

    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ paddingLeft }) => paddingLeft ? `margin-left: ${paddingLeft};` : ``}
    ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ``}
    ${({ paddingBottom }) => paddingBottom ? `padding-bottom: ${paddingBottom};` : ``}
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ``}

    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ``}
    ${({ backgroundImage }) => backgroundImage ? `background-image: ${backgroundImage};` : ``}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ backgroundRepeat }) => backgroundRepeat ? `background-repeat: ${backgroundRepeat};` : ``}
    ${({ backgroundPosition }) => backgroundPosition ? `background-position: ${backgroundPosition};` : ``}

    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}

    ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ``}
    ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ``}
    ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ display }) => display ? `display: ${display};` : ``}

    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
    ${({ textAlign }) => textAlign ? `text-align: ${textAlign};` : ``}
`

const Row = (props) => <StyledRow {...props} />

export default Row
