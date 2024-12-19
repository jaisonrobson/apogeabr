import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const CarouselContext = createContext({})

export const withCarouselContext = (WrappedComponent) => {
    const WithCarouselContext = (props) => {
        const [state, setState] = useState({ isAutoPlaying: true, isPlayingVideo: false, playerIndex: 0 })

        const value = {
            ...state,
            setIsAutoPlaying: (newValue) => setState((oldState) => ({...oldState, isAutoPlaying: newValue})),
            setIsPlayingVideo: (newValue) => setState((oldState) => ({...oldState, isPlayingVideo: newValue})),
            setPlayerIndex: (newValue) => setState((oldState) => ({...oldState, playerIndex: newValue})),
        }

        return (
            <CarouselContext.Provider value={value}>
                <WrappedComponent {...props} />
            </CarouselContext.Provider>
        )
    }

    hoistNonReactStatic(WithCarouselContext, WrappedComponent)

    WithCarouselContext.displayName = `WithCarouselContext(${getDisplayName(WrappedComponent)})`

    return WithCarouselContext
}

export const withCarouselContextConsumer = (WrappedComponent) => {
    const WithCarouselContextConsumer = (props) => (
        <CarouselContext.Consumer>
            {value => <WrappedComponent particles={value} {...props} />}            
        </CarouselContext.Consumer>
    )

    hoistNonReactStatic(WithCarouselContextConsumer, WrappedComponent)

    WithCarouselContextConsumer.displayName = `WithCarouselContextConsumer(${getDisplayName(WrappedComponent)})`

    return WithCarouselContextConsumer
}