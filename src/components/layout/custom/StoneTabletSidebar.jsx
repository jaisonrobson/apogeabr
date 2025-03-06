import React from 'react'

import { StoneTabletBoard, Div } from 'components'

const StoneTabletSidebar = ({children, collapsibleComponent: CollapsibleComponent, componentSide = "left", ...props}) => (
    <CollapsibleComponent.Sidebar {...props}>
        <StoneTabletBoard
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            flexGrowBoard="1"
            cutPieces={componentSide === "right" ? [2, 5, 8] : [0, 3, 6]}
        >
            {children}
        </StoneTabletBoard>
    </CollapsibleComponent.Sidebar>
)

export default StoneTabletSidebar