import React from 'react'

import HorizontalScroll from 'components/layout/HorizontalScroll'
import VideoModal from 'components/custom/VideoModal'


const CardsDisplay = ({ payload }) => (
    <HorizontalScroll items={payload}>
        {({ imageSrc, genre, title }) =>
            <VideoModal
                image={imageSrc}
                title={title}
                caption={genre}
                width="380px"
                height="250px"
            />
        }
    </HorizontalScroll>
)

export default CardsDisplay
