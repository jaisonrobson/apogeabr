import React from 'react'
import styled from 'styled-components'
import {
    Card as ReactstrapCard,
    CardHeader as ReactstrapCardHeader,
    CardBody as ReactstrapCardBody,
    CardFooter as ReactstrapCardFooter,
    CardTitle as ReactstrapCardTitle,
    CardSubtitle as ReactstrapCardSubtitle,
    CardText as ReactstrapCardText,
    CardLink as ReactstrapCardLink,
} from 'reactstrap'

const StyledCard = styled(({
    padding,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    minWidth,
    width,
    height,
    overflowWrap,
    boxShadow,
    border,
    borderRadius,
    background,
    backgroundColor,
    backgroundSize,
    color,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    fontFamily,
    flex,
    flexGrow,
    innerRef,
    opacity,
    onHover = false,
    animation = false,
    active = false,
    ...props
}) => <ReactstrapCard ref={innerRef} {...props} />)`
    ${({ padding }) => padding ? `padding: ${padding};` : ``}
    ${({ margin }) => margin ? `margin: ${margin};` : ``}
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ``}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ``}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ``}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ``}
    ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ``}
    ${({ width }) => width ? `width: ${width};` : ``}
    ${({ height }) => height ? `height: ${height};` : ``}
    ${({ overflowWrap }) => overflowWrap ? `overflow-wrap: ${overflowWrap};` : ``}
    ${({ boxShadow }) => boxShadow ? `box-shadow: ${boxShadow};` : ``}
    ${({ border }) => border ? `border: ${border};` : `border: 2px solid gray;`}
    ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ``}
    ${({ background }) => background ? `background: ${background};` : ``}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : `background-color: #00000030;`}
    ${({ backgroundSize }) => backgroundSize ? `background-size: ${backgroundSize};` : ``}
    ${({ color }) => color ? `color: ${color};` : ``}
    ${({ borderBottom }) => borderBottom ? `border-bottom: ${borderBottom};` : ``}
    ${({ borderTop }) => borderTop ? `border-top: ${borderTop};` : ``}
    ${({ borderLeft }) => borderLeft ? `border-left: ${borderLeft};` : ``}
    ${({ borderRight }) => borderRight ? `border-right: ${borderRight};` : ``}
    ${({ fontFamily }) => fontFamily ? `font-family: ${fontFamily};` : ``}
    ${({ flex }) => flex ? `flex: ${flex};` : ``}
    ${({ flexGrow }) => flexGrow ? `flex-grow: ${flexGrow};` : ``}
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ``}

    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.background ? `background: ${onHover?.background};` : ``}
        ${onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``}
        ${onHover?.color ? `color: ${onHover?.color};` : ``}
        ${onHover?.border ? `border: ${onHover?.border};` : ``}
        ${onHover?.borderBottom ? `border-bottom: ${onHover?.borderBottom};` : ``}
        ${onHover?.borderTop ? `border-top: ${onHover?.borderTop};` : ``}
        ${onHover?.borderLeft ? `border-left: ${onHover?.borderLeft};` : ``}
        ${onHover?.borderRight ? `border-right: ${onHover?.borderRight};` : ``}
        ${onHover?.boxShadow ? `box-shadow: ${onHover?.boxShadow};` : ``}
        ${onHover?.height ? `height: ${onHover?.height};` : ``}
        ${onHover?.width ? `width: ${onHover?.width};` : ``}
        ${onHover?.padding ? `padding: ${onHover?.padding};` : ``}
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
        
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const CardHeader = (props) => <ReactstrapCardHeader {...props} />
const CardBody = (props) => <ReactstrapCardBody {...props} />
const CardFooter = (props) => <ReactstrapCardFooter {...props} />
const CardTitle = (props) => <ReactstrapCardTitle {...props} />
const CardSubtitle = (props) => <ReactstrapCardSubtitle {...props} />
const CardText = (props) => <ReactstrapCardText {...props} />
const CardLink = (props) => <ReactstrapCardLink {...props} />

const Card = (props) => <StyledCard {...props} />

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Subtitle = CardSubtitle
Card.Text = CardText
Card.Link = CardLink

export default Card