import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import { withModalContext, withI18nContext } from 'contexts'

import Sidebar from './Sidebar'
import Content from './Content'
import Top from './Top'

import ROUTES from 'router/routes'

import { ScrollToTopButton, LeftCollapsibleSidebar, MarbleTabletSidebar, LeftCollapsible } from 'components'

const LeftMarbleTabletSidebar = (props) => <MarbleTabletSidebar collapsibleComponent={LeftCollapsible} {...props}/>

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const session = useRouteLoaderData("root")

    useEffect(() => {
        if (!session?.token)
            navigate(ROUTES.HOME.path)
        else if (session?.user.privilege.value < 5)
            navigate(ROUTES.HOME.path)
    }, [session?.token, navigate])

    return session?.user.privilege.value < 5 ? null : (
        <div ref={ref} {...props} className="index bg-primary">
            <LeftCollapsibleSidebar customSidebar={LeftMarbleTabletSidebar} sidebarChildren={<Sidebar />} useControls>
                <Top />

                <Content />

                <ScrollToTopButton />
            </LeftCollapsibleSidebar>
        </div>
    )
})

export default withI18nContext(
    withModalContext(
        Index
    )
)