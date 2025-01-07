import React, { createContext, useState } from 'react'
import _ from 'lodash'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../util/hoc'

export const FlagContext = createContext({})

export const withFlagContext = (WrappedComponent, { flag, initialValue }) => {
    const WithFlagContext = (props) => {
        const setFlag = 'set' + _.upperFirst(flag)

        const initialState = {
            [flag]: initialValue,
        }

        const [state, setState] = useState(initialState)

        const value = {
            ...state,
            [setFlag]: (value) => setState({
                ...state,
                [flag]: value,
            }),
        }

        return (
            <FlagContext.Provider value={value}>
                <WrappedComponent {...props} />
            </FlagContext.Provider>
        )
    }

    hoistNonReactStatic(WithFlagContext, WrappedComponent)

    WithFlagContext.displayName = `WithFlagContext(${getDisplayName(WrappedComponent)})`

    return WithFlagContext
}