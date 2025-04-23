import React, { useRef, forwardRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { withModalCover, Button, Row, Col, Video, Overlay, Div } from 'components'

const Close = styled.span`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

    &:hover,
    &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`

const ContentWrapper = Div
const BackgroundReffered = Div

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
        <BackgroundReffered
            ref={modalRef}
            onClick={onClick}
            display={showModal ? 'block' : 'none'}
            position="fixed"
            zIndex="999"
            left="0"
            top="0"
            width="100%"
            height="100%"
            overflow="auto"
            backgroundColor="rgba(0,0,0,0.80)"
            {...props}
        >
            <ContentWrapper
                margin="10vh auto"
                padding="20px"
                width="80%"
                height="80%"
                {...props}
                onClick={onClose}
            >
                <Close onClick={onClose}>&times;</Close>

                <Video url={url} volume={0} muted={true} onReady={onReady} {...videoProps} />
            </ContentWrapper>
        </BackgroundReffered>
    )
}

export default withModalCover(ExpandableVideoModal)
