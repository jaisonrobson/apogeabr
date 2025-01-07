import React, { useContext } from 'react'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { CollapsibleContext, withCollapsibleContext } from 'contexts'

import { Div, Nav, NavItem, NavLink, Icon } from 'components'

const Sidebar = ({ children, ...props }) => {
    const { width } = useContext(CollapsibleContext)

    return (
        <Div
            height="100%"
            width={width}
            position="fixed"
            zIndex="1"
            top="0"
            left="0"
            backgroundColor="#333"
            overflowX="hidden"
            transition="0.5s"
            display="flex"
            flexDirection="column"
            {...props}
        >
            {children}
        </Div>
    )
}

const SidebarControl = () => {
    const { isOpen, marginLeft, toogle, setWidth, setMarginLeft } = useContext(CollapsibleContext)

    const onToogle = () => {
        setWidth(isOpen ? "0px" : "300px")
        setMarginLeft(isOpen ? "0px" : "300px")
        toogle()
    }

    return (
        <Div
            height="100%"
            width="75px"
            marginLeft={marginLeft}
            position="fixed"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            transition="margin-left 0.5s"
        >
            <Nav>
                <NavItem>
                    <NavLink to="#" onClick={onToogle}>
                        {
                            isOpen
                            ? <Icon icon={faArrowLeft} color="white" size="2x" opacity=".3" onHover={{ opacity: 1 }} />
                            : <Icon icon={faArrowRight} color="white" size="2x" opacity=".3" onHover={{ opacity: 1 }} />
                        }
                    </NavLink>                    
                </NavItem>
            </Nav>
        </Div>
    )
}

const Content = ({ children, ...props }) => {
    const { marginLeft } = useContext(CollapsibleContext)

    return (
        <Div
            height="100vh"
            marginLeft={marginLeft}
            transition="margin-left 0.5s"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="stretch"
            {...props}
        >
            {children}
        </Div>
    )
}

const Collapsible = ({ children, ...props }) => (
    <Div width="100%" height="100%" {...props}>
        {children}
    </Div>
)

Collapsible.Sidebar = Sidebar
Collapsible.SidebarControl = SidebarControl
Collapsible.Content = Content

export default withCollapsibleContext(Collapsible, { isOpen: true, width: "300px", marginLeft: "300px" })