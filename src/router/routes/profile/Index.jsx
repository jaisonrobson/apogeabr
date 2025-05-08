import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'

import { withModalContext, withI18nContext } from 'contexts'

import Sidebar from './Sidebar'
import Content from './Content'
import Top from './Top'

import ROUTES from 'router/routes'

import { ScrollToTopButton, LeftCollapsibleSidebar, StoneTabletSidebar, LeftCollapsible } from 'components'

initMercadoPago(`${process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY}`, {
    locale: 'pt-BR'
})

const LeftStoneTabletSidebar = (props) => <StoneTabletSidebar collapsibleComponent={LeftCollapsible} {...props}/>

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const session = useRouteLoaderData("root")

    useEffect(() => {
        if (!session?.token)
            navigate(ROUTES.HOME.path)

    }, [session?.token, navigate])

    return !session?.token ? null : (
        <div ref={ref} {...props} className="index bg-primary">
            <LeftCollapsibleSidebar customSidebar={LeftStoneTabletSidebar} sidebarChildren={<Sidebar />}>
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