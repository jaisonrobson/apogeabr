import React, { useRef, forwardRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { withModalCover, Button, Row, Col, Video, Overlay } from 'components'

const BackgroundWrapper = styled(({ display, innerRef, ...props }) => <div ref={innerRef} {...props} />)`
    ${({ display }) => display ? `display: block;` : 'display: none;'}
    position: fixed; /* Stay in place */
    z-index: 999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.80); /* Black w/ opacity */
    border: none;
`

const BackgroundReffered = forwardRef((props, ref) => (<BackgroundWrapper innerRef={ref} {...props} />))

const ContentWrapper = styled(({ width, height, ...props }) => <div {...props} />)`
    margin: 10vh auto;
    padding: 20px;
    border: none;
    ${({ width }) => width ? `width: ${width};` : `width: 80%;`}
    ${({ height }) => height ? `height: ${height};` : `height: 80%;`}
    background-color: rgba(0,0,0,0.80); /* Black w/ opacity */
`

const Close = styled.span`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    border: none;

    &:hover,
    &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`

const ExpandableVideoModal = ({ showModal, onClose, children, url, videoProps = {}, ...props }) => {
    const modalRef = useRef(null)
    const [isReady, setIsReady] = useState(false)

    const onReady = () => {
        setIsReady(true)
    }

    const onClick = (event) => {
        if (modalRef && modalRef.current && event.target === modalRef.current)
            onClose()
    }

    return (
        <BackgroundReffered ref={modalRef} onClick={onClick} display={showModal}>
            <ContentWrapper {...props} style={{ backgroundColor: `transparent`, padding: 0, border: 'none' }} onClick={onClose}>
                <Close onClick={onClose}>&times;</Close>

                <Video url={url} volume={0} muted={true} onReady={onReady} {...videoProps} />
            </ContentWrapper>
        </BackgroundReffered>
    )
}

export default withModalCover(ExpandableVideoModal)
