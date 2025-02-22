import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

import { withReducerContext, withModalContext } from 'contexts'

import Content from './Content'

import ROUTES from 'router/routes'

import { ScrollToTopButton } from 'components'

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const session = useRouteLoaderData("root")

    useEffect(() => {
        if (session?.token)
            navigate(ROUTES.HOME.path)

    }, [session?.token, navigate])

    return (
        <div ref={ref} {...props} className="index bg-primary">
            <Content />
            
            <ScrollToTopButton />
        </div>
    )
})

export default withReducerContext(
    withModalContext(
        Index
    )
)