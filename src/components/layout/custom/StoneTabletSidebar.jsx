import React from 'react'

import { Collapsible, StoneTabletBoard, Div } from 'components'

const StoneTabletSidebar = ({children, ...props}) => (
    <Collapsible.Sidebar {...props}>
        <StoneTabletBoard
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            flexGrowBoard="1"
            cutPieces={[0, 3, 6]}
        >
            {children}
        </StoneTabletBoard>
    </Collapsible.Sidebar>
)

export default StoneTabletSidebar