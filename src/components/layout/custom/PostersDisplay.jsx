import React from 'react'

import { HorizontalScroll, VideoModal } from 'components'

const PostersDisplay = ({ payload }) => (
    <HorizontalScroll items={payload}>
        {({ imageSrc, genre, title }) =>
            <VideoModal
                image={imageSrc}
                title={title}
                caption={genre}
                width="300px"
                height="400px"
            />
        }
    </HorizontalScroll>
)

export default PostersDisplay
