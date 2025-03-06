import React from 'react'

import { RightCollapsible } from 'components'
import { SecondCollapsibleContext } from 'contexts'

const RightCollapsibleSidebar = ({ children, customSidebar: CustomSidebar = RightCollapsible.Sidebar, sidebarChildren, useControls, ...props }) => (
    <RightCollapsible {...props}>
        <CustomSidebar context={SecondCollapsibleContext}>
            {sidebarChildren}
        </CustomSidebar>

        {useControls ? <RightCollapsible.SidebarControl context={SecondCollapsibleContext} /> : null}

        <RightCollapsible.Content context={SecondCollapsibleContext}>
            {children}
        </RightCollapsible.Content>
    </RightCollapsible>
)

export default RightCollapsibleSidebar