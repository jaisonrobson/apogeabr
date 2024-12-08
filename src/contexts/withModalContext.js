import React, { createContext, useRef } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const ModalContext = createContext({})

export const withModalContext = (WrappedComponent) => {
    const WithModalContext = (props) => {
        const modalRef = useRef(null)

        const value = {
            modalRef: modalRef,
        }

        return (
            <ModalContext.Provider value={value}>
                <WrappedComponent ref={modalRef} {...props} />
            </ModalContext.Provider>
        )
    }

    hoistNonReactStatic(WithModalContext, WrappedComponent)

    WithModalContext.displayName = `WithModalContext(${getDisplayName(WrappedComponent)})`

    return WithModalContext
}

export const withModalContextConsumer = (WrappedComponent) => {
    const WithModalContextConsumer = (props) => (
        <ModalContext.Consumer>
            {value => <WrappedComponent modal={value} {...props} />}            
        </ModalContext.Consumer>
    )

    hoistNonReactStatic(WithModalContextConsumer, WrappedComponent)

    WithModalContextConsumer.displayName = `WithModalContextConsumer(${getDisplayName(WrappedComponent)})`

    return WithModalContextConsumer
}