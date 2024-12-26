import React, { useContext, useEffect, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"

import { withReducerContext, withModalContext, withParticlesContext, ParticlesContext } from 'contexts'

import { UserContext } from 'contexts'

import Content from './Content'

import { ScrollToTopButton } from 'components'

import { login, fetchMovies } from 'store/actions'

const Index = forwardRef(({children, ...props}, ref) => {
    const navigate = useNavigate()
    const { setIsInitialized } = useContext(ParticlesContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user.isLogged)
            navigate('/')

        initParticlesEngine(async (engine) => {
            await loadAll(engine)
        }).then(() => {
            setIsInitialized(true)
        })
    }, [user.isLogged])

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