import React from 'react'
import styled from 'styled-components'

import { faAngry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledIcon = styled(({ paddingTop, color, opacity, onHover = false, animation, textShadow, ...props }) => <FontAwesomeIcon {...props} />)`
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ''}

    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ''}
    ${({ color }) => color ? `color: ${color};` : ''}
    ${({ textShadow }) => textShadow ? `text-shadow: ${textShadow};` : ''}
    
    ${({ onHover }) => onHover ? `&:hover {
        ${onHover?.backgroundColor ? `background-color: ${onHover?.backgroundColor};` : ``}
        ${onHover?.border ? `border: ${onHover?.border};` : ``}
        ${onHover?.borderBottom ? `border-bottom: ${onHover?.borderBottom};` : ``}
        ${onHover?.borderTop ? `border-top: ${onHover?.borderTop};` : ``}
        ${onHover?.borderLeft ? `border-left: ${onHover?.borderLeft};` : ``}
        ${onHover?.borderRight ? `border-right: ${onHover?.borderRight};` : ``}
        ${onHover?.boxShadow ? `box-shadow: ${onHover?.boxShadow};` : ``}
        ${onHover?.height ? `height: ${onHover?.height};` : ``}
        ${onHover?.width ? `width: ${onHover?.width};` : ``}
        ${onHover?.padding ? `padding: ${onHover?.padding};` : ``}
        ${onHover?.margin ? `margin: ${onHover?.margin};` : ``}
        ${onHover?.opacity ? `opacity: ${onHover?.opacity};` : ``}
        ${onHover?.color ? `color: ${onHover?.color};` : ``}
        ${onHover?.textShadow ? `text-shadow: ${onHover?.textShadow};` : ``}
        ${onHover?.animation ? `animation: ${onHover?.animation?.property}; ${onHover?.animation?.corpse}` : ``}
    };`: ``}

    ${({ animation }) => animation ? `animation: ${animation?.property}; ${animation?.corpse}`: ``}
`

const Icon = (props) => (
    <StyledIcon
        icon={faAngry}
        {...props}
    />
)

export default Icon
