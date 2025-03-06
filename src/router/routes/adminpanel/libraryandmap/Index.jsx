import React from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import Sidebar from './Sidebar'
import Content from './Content'

import ROUTES from 'router/routes'

import { ScrollToTopButton, RightCollapsibleSidebar, MarbleTabletSidebar, RightCollapsible } from 'components'

const RightMarbleTabletSidebar = (props) => <MarbleTabletSidebar collapsibleComponent={RightCollapsible} componentSide="right" {...props}/>

const LibraryAndMapIndex = (props) => (
    <RightCollapsibleSidebar customSidebar={RightMarbleTabletSidebar} sidebarChildren={<Sidebar />} useControls={true}>
        <Content />

        <ScrollToTopButton />
    </RightCollapsibleSidebar>
)

export default LibraryAndMapIndex