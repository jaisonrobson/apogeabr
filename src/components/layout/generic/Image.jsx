import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line jsx-a11y/alt-text
const StyledImage = styled(({ objectFit, width, height, zIndex, ...props }) => <img {...props} />)`
    ${({ objectFit }) => objectFit ? `object-fit: ${objectFit};` : ''}
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}
    ${({ zIndex }) => zIndex ? `z-index: ${zIndex};` : ''}
`

const Image = (props) => <StyledImage className="unselectable" alt="" {...props} />

export default Image
