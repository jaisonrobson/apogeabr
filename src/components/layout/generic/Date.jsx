import React from 'react'
import styled from 'styled-components'

const StyledDate = styled(({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    margin,
    padding,
    ...props
}) => <span {...props} />)`
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ''}
    ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''}
    ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ''}
    ${({ margin }) => margin ? `margin: ${margin};` : ''}
    ${({ padding }) => padding ? `padding: ${padding};` : ''}
`

const DateComponent = ({ date: dateParam, ...props }) => {
    const date = new Date(dateParam)

    const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })

    const formattedDate = formatter.format(date).replace(', ', ' ');

    return <StyledDate {...props}>{formattedDate}</StyledDate>
}

export default DateComponent
