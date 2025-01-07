import React from 'react'

import { Collapsible } from 'components'

const CollapsibleSidebar = ({ children, customSidebar: CustomSidebar = Collapsible.Sidebar, sidebarChildren, useControls, ...props }) => (
    <Collapsible {...props}>
        <CustomSidebar>
            {sidebarChildren}
        </CustomSidebar>

        {useControls ? <Collapsible.SidebarControl /> : null}

        <Collapsible.Content>
            {children}
        </Collapsible.Content>
    </Collapsible>
)

export default CollapsibleSidebar