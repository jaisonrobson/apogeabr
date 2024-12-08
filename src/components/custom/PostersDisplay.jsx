import React from 'react'

import HorizontalScroll from 'components/layout/HorizontalScroll'
import VideoModal from 'components/custom/VideoModal'

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
