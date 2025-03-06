import React from 'react'

import { LeftCollapsible } from 'components'

const LeftCollapsibleSidebar = ({ children, customSidebar: CustomSidebar = LeftCollapsible.Sidebar, sidebarChildren, useControls, ...props }) => (
    <LeftCollapsible {...props}>
        <CustomSidebar>
            {sidebarChildren}
        </CustomSidebar>

        {useControls ? <LeftCollapsible.SidebarControl /> : null}

        <LeftCollapsible.Content>
            {children}
        </LeftCollapsible.Content>
    </LeftCollapsible>
)

export default LeftCollapsibleSidebar