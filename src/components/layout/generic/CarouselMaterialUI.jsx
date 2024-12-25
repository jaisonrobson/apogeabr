import React from 'react'
import Carousel from 'react-material-ui-carousel'

import { Button } from 'components'

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
    <Button onClick={onClick} className={className} style={style} width="100px" height="100%" borderRadius="75%" opacity=".7">
        {next && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`>`}</p>}
        {prev && <p style={{ textAlign: 'center', fontSize: 50, paddingTop: '15px', color: 'white' }}>{`<`}</p>}
    </Button>
)

export default WrappedCarousel