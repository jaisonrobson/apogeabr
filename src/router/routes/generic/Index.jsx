import React, { useContext, useEffect, forwardRef } from 'react'
import { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"

import { withReducerContext, ReducerContext, withModalContext, withParticlesContext, ParticlesContext, withI18nContext } from 'contexts'

import { ScrollToTopButton  } from 'components'
import Top from './Top'
import Bottom from './Bottom'

import { login, fetchMovies } from 'store/actions'

import moviesPayload from 'data/moviesPayload'

const Index = forwardRef(({children, ...props}, ref) => {
    const { setIsInitialized } = useContext(ParticlesContext)
    const { dispatch, ...state } = useContext(ReducerContext)

    useEffect(() => {
        fetchMovies(dispatch, moviesPayload)

        initParticlesEngine(async (engine) => {
            await loadAll(engine)
        }).then(() => {
            setIsInitialized(true)
        })
    }, [dispatch, state.movies])

    return (
        <div ref={ref} {...props}>
            <Top />

            {children}

            <Bottom />

            <ScrollToTopButton />
        </div>
    )
})

export default withReducerContext(
    withI18nContext(
        withParticlesContext(
            withModalContext(
                Index
            )
        )
    )
)