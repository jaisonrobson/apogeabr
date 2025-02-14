import React, { createContext, useState } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const DefaultPaginationContext = createContext({})

export const withDefaultPaginationContext = (WrappedComponent, defaultValues={}) => {
    const WithDefaultPaginationContext = (props) => {
        const [state, setState] = useState({
            isLoading: false,
            page: 1,
            perPage: 5,
            totalPages: 1,
            payload: {},
            ...defaultValues,
        })

        const value = {
            ...state,
            setPage: (newValue) => setState((oldState) => ({...oldState, page: newValue})),
            setPerPage: (newValue) => setState((oldState) => ({...oldState, perPage: newValue})),
            setTotalPages: (newValue) => setState((oldState) => ({...oldState, totalPages: newValue})),
            setPayload: (newValue) => setState((oldState) => ({...oldState, payload: newValue})),
            enableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: true})),
            disableLoading: (newValue) => setState((oldState) => ({...oldState, isLoading: false})),
        }

        return (
            <DefaultPaginationContext.Provider value={value}>
                <WrappedComponent {...props} />
            </DefaultPaginationContext.Provider>
        )
    }

    hoistNonReactStatic(WithDefaultPaginationContext, WrappedComponent)

    WithDefaultPaginationContext.displayName = `WithDefaultPaginationContext(${getDisplayName(WrappedComponent)})`

    return WithDefaultPaginationContext
}