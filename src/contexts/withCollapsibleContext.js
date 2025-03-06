import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const FirstCollapsibleContext = createContext({})
export const SecondCollapsibleContext = createContext({})

export const withCollapsibleContext = (WrappedComponent, { context: Context }, defaultValues={}) => {
    const WithCollapsibleContext = (props) => {
        const [state, setState] = useState({
            componentSide: "left",
            isOpen: false,
            marginLeft: "0px",
            marginRight: "0px",
            width: "0px",
            ...defaultValues,
        })

        const value = {
            ...state,
            setIsOpen: (newValue) => setState((oldState) => ({...oldState, isOpen: newValue})),
            setWidth: (newValue) => setState((oldState) => ({...oldState, width: newValue})),
            setMarginLeft: (newValue) => setState((oldState) => ({...oldState, marginLeft: newValue})),
            setMarginRight: (newValue) => setState((oldState) => ({...oldState, marginRight: newValue})),
            toggle: () => setState((oldState) => ({...oldState, isOpen: !oldState.isOpen})),
        }

        return (
            <Context.Provider value={value}>
                <WrappedComponent {...props} context={Context} />
            </Context.Provider>
        )
    }

    hoistNonReactStatic(WithCollapsibleContext, WrappedComponent)

    WithCollapsibleContext.displayName = `WithCollapsibleContext(${getDisplayName(WrappedComponent)})`

    return WithCollapsibleContext
}