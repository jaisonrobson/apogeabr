import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-material-ui-carousel'

import Button from 'components/layout/Button'

const StyledButton = styled((props) => <Button {...props} />)`
    height: 100%;
    width: 100px;
    border-radius: 75%;
    opacity: .7;

    &:hover {
        opacity: 100;
    }
`
const WrappedCarousel = ({ items, item: Item, itemProps, ...props }) => (
    <Carousel
        autoPlay={true}
        fullHeightHover={false}
        activeIndicatorIconButtonProps={{ style: { backgroundColor: 'white'} }}
        indicatorIconButtonProps={{ style: { padding: '3px', color: 'white'} }}
        navButtonsProps={{ style: { backgroundColor: '#000'} }}
        navButtonsAlwaysVisible
        NavButton={NavButton}
        {...props}
    >
        {items.map( (item, i) => (
            <Item key={JSON.stringify(item)} itemIndex={i} item={item} {...itemProps} />
        ))}
    </Carousel>
)

const NavButton = ({onClick, className, style, next, prev}) => (
    <StyledButton onClick={onClick} className={className} style={style}>
        {next && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`>`}</p>}
        {prev && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`<`}</p>}
    </StyledButton>
)

export default WrappedCarousel