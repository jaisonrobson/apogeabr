import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled(({display, backgroundColor, children, ...props}) => <div {...props} />)`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    ${({ display }) => display ? `display: ${display};` : 'display: none;'}
    ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : 'background-color: rgba(0,0,0,0.5);'}
`

export default ModalContainer