import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const ParticlesContext = createContext({})

export const withParticlesContext = (WrappedComponent) => {
    const WithParticlesContext = (props) => {
        const [state, setState] = useState({ isInitialized: false })

        const value = {
            ...state,
            setIsInitialized: (newValue) => setState({...state, isInitialized: newValue})
        }

        return (
            <ParticlesContext.Provider value={value}>
                <WrappedComponent {...props} />
            </ParticlesContext.Provider>
        )
    }

    hoistNonReactStatic(WithParticlesContext, WrappedComponent)

    WithParticlesContext.displayName = `WithParticlesContext(${getDisplayName(WrappedComponent)})`

    return WithParticlesContext
}

export const withParticlesContextConsumer = (WrappedComponent) => {
    const WithParticlesContextConsumer = (props) => (
        <ParticlesContext.Consumer>
            {value => <WrappedComponent particles={value} {...props} />}            
        </ParticlesContext.Consumer>
    )

    hoistNonReactStatic(WithParticlesContextConsumer, WrappedComponent)

    WithParticlesContextConsumer.displayName = `WithParticlesContextConsumer(${getDisplayName(WrappedComponent)})`

    return WithParticlesContextConsumer
}