import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import { withModalContext, withI18nContext } from 'contexts'

import Sidebar from './Sidebar'
import Content from './Content'
import Top from './Top'

import ROUTES from 'router/routes'

import { ScrollToTopButton, CollapsibleSidebar, StoneTabletSidebar } from 'components'

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const session = useRouteLoaderData("root")

    useEffect(() => {
        if (!session?.token)
            navigate(ROUTES.HOME.path)

    }, [session?.token, navigate])

    return (
        <div ref={ref} {...props} className="index bg-primary">
            <CollapsibleSidebar customSidebar={StoneTabletSidebar} sidebarChildren={<Sidebar />}>
                <Top />

                <Content />

                <ScrollToTopButton />
            </CollapsibleSidebar>
        </div>
    )
})

export default withI18nContext(
    withModalContext(
        Index
    )
)