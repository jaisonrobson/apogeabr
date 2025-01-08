import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"

import { withReducerContext, withModalContext, withParticlesContext, ParticlesContext } from 'contexts'

import Sidebar from './Sidebar'
import Content from './Content'
import Top from './Top'

import ROUTES from 'router/routes'

import { ScrollToTopButton, CollapsibleSidebar, StoneTabletSidebar } from 'components'

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const session = useRouteLoaderData("root")
    const { setIsInitialized } = useContext(ParticlesContext)

    useEffect(() => {
        if (!session?.token)
            navigate(ROUTES.HOME.path)

        initParticlesEngine(async (engine) => {
            await loadAll(engine)
        }).then(() => {
            setIsInitialized(true)
        })
    }, [session?.token, navigate, setIsInitialized])

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

export default withReducerContext(
    withParticlesContext(
        withModalContext(
            Index
        )
    )    
)