import React, { useContext, useEffect, forwardRef } from 'react'

import { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"

import { withReducerContext, ReducerContext, withModalContext, withParticlesContext, ParticlesContext } from 'contexts'

import Content from './Content'

import { ScrollToTopButton } from 'components'

import { login, fetchMovies } from 'store/actions'

const user = {
    name: 'David'
}

const Index = forwardRef(({children, ...props}, ref) => {
    const { setIsInitialized } = useContext(ParticlesContext)

    const { dispatch, ...state } = useContext(ReducerContext)

    useEffect(() => {
        // login(dispatch, user)

        initParticlesEngine(async (engine) => {
            await loadAll(engine)
        }).then(() => {
            setIsInitialized(true)
        })
    }, [dispatch/*, state.user*/])

    return (
        <div ref={ref} {...props} className="index bg-primary">
            <Content />
            
            <ScrollToTopButton />
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