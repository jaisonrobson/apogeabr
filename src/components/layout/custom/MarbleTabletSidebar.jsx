import React from 'react'

import { MarbleTabletBoard, Div } from 'components'

const MarbleTabletSidebar = ({children, collapsibleComponent: CollapsibleComponent, componentSide = "left", ...props}) => (
    <CollapsibleComponent.Sidebar {...props}>
        <MarbleTabletBoard
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            flexGrowBoard="1"
            cutPieces={componentSide === "right" ? [2, 5, 8] : [0, 3, 6]}
            styling={[
                {maxWidth: '85px', height: '85px', marginLeft: componentSide === 'right' ? '12px' : 'auto'},
                {height: '85px'},
                {maxWidth: '85px', height: '85px', marginRight: componentSide === 'left' ? '12px' : 'auto'},
                {maxWidth: '85px', marginLeft: componentSide === 'right' ? '12px' : 'auto'},
                {width: '86px', marginRight: componentSide === 'left' ? '-48px' : 'auto', marginLeft: componentSide === 'right' ? '-72px' : 'auto'},
                {maxWidth: '85px', marginRight: '12px'},
                {maxWidth: '85px', height: '85px', marginLeft: componentSide === 'right' ? '12px' : 'auto'},
                {height: '85px'},
                {maxWidth: '85px', height: '85px', marginRight: componentSide === 'left' ? '12px' : 'auto'},
            ]}
        >
            {children}
        </MarbleTabletBoard>
    </CollapsibleComponent.Sidebar>
)

export default MarbleTabletSidebar