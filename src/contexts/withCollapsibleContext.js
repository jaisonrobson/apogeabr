import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const CollapsibleContext = createContext({})

export const withCollapsibleContext = (WrappedComponent, defaultValues={}) => {
    const WithCollapsibleContext = (props) => {
        const [state, setState] = useState({
            isOpen: false,
            marginLeft: "0px",
            width: "0px",
            ...defaultValues,
        })

        const value = {
            ...state,
            setIsOpen: (newValue) => setState((oldState) => ({...oldState, isOpen: newValue})),
            setWidth: (newValue) => setState((oldState) => ({...oldState, width: newValue})),
            setMarginLeft: (newValue) => setState((oldState) => ({...oldState, marginLeft: newValue})),
            toogle: () => setState((oldState) => ({...oldState, isOpen: !oldState.isOpen})),
        }

        return (
            <CollapsibleContext.Provider value={value}>
                <WrappedComponent {...props} />
            </CollapsibleContext.Provider>
        )
    }

    hoistNonReactStatic(WithCollapsibleContext, WrappedComponent)

    WithCollapsibleContext.displayName = `WithCollapsibleContext(${getDisplayName(WrappedComponent)})`

    return WithCollapsibleContext
}