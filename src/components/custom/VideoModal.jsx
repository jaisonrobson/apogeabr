import React, { useRef, forwardRef } from 'react'
import styled from 'styled-components'

import ModalCover from 'components/custom/ModalCover'

import Button from 'components/layout/Button'

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
`

const BackgroundReffered = forwardRef((props, ref) => (<BackgroundWrapper innerRef={ref} {...props} />))

const ContentWrapper = styled.div`
    margin: 10vh auto;
    padding: 20px;
    //border: 1px solid #888;
    width: 80%;
    height: 80%;
    background-color: rgba(0,0,0,0.80); /* Black w/ opacity */
`

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

const VideoModal = ({ showModal, onClose }) => {
    const modalRef = useRef(null)

    const onClick = (event) => {
        if (modalRef && modalRef.current && event.target === modalRef.current)
            onClose()
    }

    return (
        <BackgroundReffered ref={modalRef} onClick={onClick} display={showModal}>
            <ContentWrapper>
                <Close onClick={onClose}>&times;</Close>
                <video width="100%" height="85%" controls>
                    <source src="/videos/wildlife.mp4" type="video/mp4" />
                </video>
                
                <hr style={{color: "white"}}/>

                <div style={{ margin: 'auto' }}>
                    <Button>Watch</Button>
                </div>
            </ContentWrapper>
        </BackgroundReffered>
    )
}

export default ModalCover(VideoModal)
