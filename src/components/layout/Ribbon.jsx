import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    position: relative;
`

const StyledBackground = styled(({ backgroundImage, ...props }) => <div {...props} />)`
    background-image: url(${({ backgroundImage }) => backgroundImage});
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    width: 100%;
    height: 35rem;
    z-index: 1;
`

const StyledOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom,rgba(0,0,0,1), rgba(0,0,0,.9) 25%, rgba(0,0,0,.4) 100%);
    z-index: 2;
`

const StyledCaption = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
`

const Ribbon = ({ payload = {}, children }) => {
    return (
        <StyledWrapper>
            <StyledOverlay />

            <StyledCaption>
                {children(payload)}
            </StyledCaption>

            <StyledBackground backgroundImage={payload.imageSrc || null} />
        </StyledWrapper>
    )
}

export default Ribbon
