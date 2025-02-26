import React from 'react'

import { Collapsible, MarbleTabletBoard, Div } from 'components'

const StoneTabletSidebar = ({children, ...props}) => (
    <Collapsible.Sidebar {...props}>
        <MarbleTabletBoard
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            flexGrowBoard="1"
            cutPieces={[0, 3, 6]}
            styling={[
                {maxWidth: '85px', height: '85px'},
                {height: '85px'},
                {maxWidth: '85px', height: '85px', marginRight: '12px'},
                {maxWidth: '85px'},
                {width: '86px', marginRight: '-36px'},
                {maxWidth: '85px', marginRight: '12px'},
                {maxWidth: '85px', height: '85px'},
                {height: '85px'},
                {maxWidth: '85px', height: '85px', marginRight: '12px'},
            ]}
        >
            {children}
        </MarbleTabletBoard>
    </Collapsible.Sidebar>
)

export default StoneTabletSidebar