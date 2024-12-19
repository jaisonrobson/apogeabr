import React from 'react'
import _ from 'lodash'

import Carousel from 'components/layout/CarouselMaterialUI'

const Item = ({
    divProps = { style: { paddingLeft: '150px', paddingRight: '150px' } },
    imgProps = { height: '500px', style: { objectFit: 'contain' } },
    item,
    itemIndex,
    ...props
}) => (
    <div style={{ paddingLeft: divProps?.style?.paddingLeft || '0', paddingRight: divProps?.style?.paddingRight || '0', ...divProps?.style }} {...props}>
        <img style={{ objectFit: imgProps?.style?.objectFit || 'contain' }} width="100%" height={imgProps?.height || '500px'} src={item.imageSrc}></img>
    </div>
)

const ImageCarousel = (props) => (
    <Carousel height={"700px"} item={Item} {...props}/>
)

export default ImageCarousel