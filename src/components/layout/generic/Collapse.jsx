import React, { useContext } from 'react'
import { Collapse as ReactstrapCollapse } from 'reactstrap'

import { FlagContext, withFlagContext } from 'contexts'

import { Div, Button } from 'components'

const CollapseButton = ({ Component = Button, ...props }) => {
    const { isOpen, setIsOpen } = useContext(FlagContext)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <Component {...props} onClick={toggle} />
    )
}

const CollapseContent = ({ children, ...props }) => {
    const { isOpen } = useContext(FlagContext)

    return (
        <ReactstrapCollapse isOpen={isOpen} {...props}>
            {children}
        </ReactstrapCollapse>
    )
}

const Collapse = ({ children, ...props }) => (
    <Div {...props}>
        {children}
    </Div>
)

Collapse.Button = CollapseButton
Collapse.Content = CollapseContent

export default withFlagContext(
    Collapse,
    {
        flag: 'isOpen',
        initialValue: false,
    },
)