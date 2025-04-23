import React, { useRef, forwardRef } from 'react'
import styled from 'styled-components'

import { withModalCover, Button, Row, Col, Image, Overlay, Div } from 'components'

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

const ExpandableImageModal = ({ showModal, onClose, children, image, imageProps = {}, ...props }) => {
    const modalRef = useRef(null)

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

                <Image src={image} objectFit="contain" {...imageProps}/>
            </ContentWrapper>
        </BackgroundReffered>
    )
}

export default withModalCover(ExpandableImageModal)
