import React, { useEffect, useRef, useState, forwardRef } from 'react'
import styled from 'styled-components'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { isDesktop } from 'react-device-detect'

import { Icon } from 'components'

const Wrapper = styled.div`
    position: relative;
`

const IndicatorsOverlay = styled(({ display, ...props }) => <div {...props} />)`
    position: absolute;    
    width: 100%;
    height: 100%;
    ${({ display }) => display ? `display: ${display};` : ''}
`

const Indicator = styled(({ innerRef, left, right, width, ...props }) => <div ref={innerRef} {...props} />)`
    position: absolute;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .3;
    z-index: 5;
    ${({ left }) => left ? `left: ${left};` : ''}
    ${({ right }) => right ? `right: ${right};` : ''}

    &:hover {
        opacity: 1;
    }
`

const IndicatorReffered = forwardRef((props, ref) => (<Indicator innerRef={ref} {...props} />))

const StyledHorizontalScroll = styled.div`
    --webkit-overflow-scrolling: touch;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 4rem;
    
    &::-webkit-scrollbar {
        display: none;
    }
`

const StyledHorizontalScrollItem = styled(({ marginLeft, marginRight, itemSize, ...props }) => <div {...props} />)`
    flex: 0 0 ${({ itemSize }) => itemSize ? itemSize : 'auto'};
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''}
    ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ''}
`

const initialItems = [
    {
        genre: 'none',
        title: 'none',
        imageSrc: null,
    }
]

const HorizontalScroll = ({ items = initialItems, children }) => {
    const ref = useRef(null)
    const leftIndicatorRef = useRef(null)
    const rightIndicatorRef = useRef(null)
    const [showIndicators, setShowIndicators] = useState(false)
    const scrollLeft = () => {
        const node = ref.current

        node.scrollBy({
            left: -node.clientWidth,
            behavior: 'smooth',
        })
    }
    const scrollRight = () => {
        const node = ref.current

        node.scrollBy({
            left: node.clientWidth,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        if (!isDesktop) return false

        const overLeft = () => scrollLeft()
        const overRight = () => scrollRight()
        const displayIndicators = () => setShowIndicators(true)

        const nodeLeft = leftIndicatorRef.current
        const nodeRight = rightIndicatorRef.current
        const node = ref.current

        if (node) {
            if (node.scrollWidth > window.innerWidth) {
                displayIndicators()
            }
        }

        nodeLeft.addEventListener("mouseover", overLeft)
        nodeRight.addEventListener("mouseover", overRight)

        return () => {
            nodeLeft.removeEventListener("mouseover", overLeft)
            nodeRight.removeEventListener("mouseover", overRight)
        }
    })

    return (
        <Wrapper>
            <IndicatorsOverlay display={showIndicators ? false : 'none'}>
                <IndicatorReffered ref={leftIndicatorRef} left="0">
                    <Icon size="3x" icon={faChevronLeft} />
                </IndicatorReffered>

                <IndicatorReffered ref={rightIndicatorRef} right="0">
                    <Icon size="3x" icon={faChevronRight} />
                </IndicatorReffered>
            </IndicatorsOverlay>

            <StyledHorizontalScroll ref={ref}>
                {items.map((item, index) => (
                    <StyledHorizontalScrollItem
                        key={item.imageSrc}
                        marginLeft={index !== 0 ? '2rem' : '0'}
                    >
                        {children(item)}
                    </StyledHorizontalScrollItem>
                ))}
            </StyledHorizontalScroll>
        </Wrapper>
    )
}

export default HorizontalScroll
