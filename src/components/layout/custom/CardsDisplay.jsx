import React from 'react'

import { HorizontalScroll, VideoModal } from 'components'

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
