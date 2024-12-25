import React, { useEffect, useState, forwardRef, createRef } from 'react'
import styled from 'styled-components'
import { isDesktop } from 'react-device-detect'

import { GradientOverlay, Overlay } from 'components'

const StyledItem = styled(({ backgroundImage, opacity, ...props }) => <div {...props} />)`
    background-image: url(${({ backgroundImage }) => backgroundImage});
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    transition: opacity 2s ease;
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    ${({ opacity }) => opacity ? `opacity: ${opacity};` : ''}
`

const StyledIndicators = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-right: 15%;
    margin-bottom: 5vh;
    margin-left: 15%;
    list-style: none;
`

const StyledIndicator = styled(({ opacity, cursor, ...props }) => <button {...props} />)`
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 12px;
    height: 12px;
    padding: 0;
    margin-right: 7px;
    margin-left: 7px;
    text-indent: -999px;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: ${({ opacity }) => opacity ? opacity : '.5'};
    transition: opacity .6s ease;
    ${({ cursor }) => cursor ? `cursor: ${cursor};` : ''}
    border-radius: 50%;
`

const StyledCaptionWrapper = styled(({ width, height, ...props }) => <div {...props} />)`
    position: absolute;
    padding: 2rem;
    z-index: 3;
    ${({ width }) => width ? `width: ${width};` : ''}
    ${({ height }) => height ? `height: ${height};` : ''}
`

const StyledCaption = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    color: #FFFFFF;
`

const StyledBackground = styled.div`
    width: 100%;
    height: 100%;
`

const StyledCarousel = styled(({ width, height, innerRef, ...props }) => <div ref={innerRef} {...props} />)`
    position: relative;
    ${({ width }) => width ? `width: ${width};` : ''}    
    ${({ height }) => height ? `height: ${height};` : ''}
`

const ReferredCarousel = forwardRef((props, ref) => <StyledCarousel innerRef={ref} {...props} />)

const initialPayload = [
    {
        src: null,
    },
]

//Este componente sera refatorado em outro momento.
const Carousel = ({
    interval = 6000,
    isIndicators = true,
    width = '100%',
    height = '85vh',
    imageParameter = 'src',
    caption = () => null,
    payload = initialPayload,
}) => {
    const ref = createRef(null)
    const [active, setActive] = useState(0)
    const next = () => setActive(active === (payload.length - 1) ? 0 : active + 1)

    useEffect(
        () => {
            let rotationEvent = setInterval(next, interval)
            const over = () => clearInterval(rotationEvent)
            const leave = () => rotationEvent = setInterval(next, interval)
            const node = ref.current

            if (isDesktop) {
                node.addEventListener("mouseover", over)
                node.addEventListener("mouseleave", leave)
            }

            return () => {
                clearInterval(rotationEvent)
                if (isDesktop) {
                    node.removeEventListener("mouseover", over)
                    node.removeEventListener("mouseleave", leave)
                }
            }
        }
    )

    return (
        <ReferredCarousel ref={ref} width={width} height={height}>
            {isIndicators ? (
                <StyledIndicators>
                    {payload.map((element, index) => (
                        <StyledIndicator
                            key={element[imageParameter]}
                            onClick={() => setActive(index)}
                            disabled={active === index}
                            opacity={active === index ? '1' : false}
                            cursor={active === index ? 'default' : 'pointer'}
                        />
                    ))}
                </StyledIndicators>
            ) : null}

            <StyledCaptionWrapper width={width} height={height}>
                <StyledCaption>
                    {caption({ payload, active })}
                </StyledCaption>
            </StyledCaptionWrapper>

            <StyledBackground>
                {payload.map((element, index) => (
                    <StyledItem
                        key={element[imageParameter]}
                        backgroundImage={payload[index][imageParameter]}
                        opacity={active === index ? '1' : '0'}
                    />
                ))}
            </StyledBackground>

            <Overlay
                position='absolute'
                width='100%'
                top='0'
                left='0'
                height='100%'
            />

            <GradientOverlay
                position='absolute'
                width='100%'
                top='0'
                left='0'
                height='100%'
            />
        </ReferredCarousel>
    )
}

export default Carousel
