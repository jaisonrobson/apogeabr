import React from 'react'

import {
    StoneTabletBoard,
    Container,
} from 'components'

const Configuration = () => (
    <StoneTabletBoard>
        <Container
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className="unselectable"
        >
        </Container>
    </StoneTabletBoard>
)

export default Configuration
