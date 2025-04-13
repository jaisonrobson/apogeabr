import React from 'react'
import { redirect } from 'react-router-dom'

import ROUTES from 'router/routes'

import { HorizontalScroll, VideoModal, Cover } from 'components'

const CardsDisplay = ({ payload }) => {

    const onClick = (id) => {
        window.location.assign(
            `${ROUTES.NEWS.path.slice(0, -1)}?id=${id}`
        )
    }

    return (
        <HorizontalScroll items={payload}>
            {(item) => <Cover
                image={item?.image}
                title={item?.title}
                caption={item?.caption}
                width="380px"
                height="250px"
                onClick={() => onClick(item?.id)} />}
        </HorizontalScroll>
    )
}

export default CardsDisplay
