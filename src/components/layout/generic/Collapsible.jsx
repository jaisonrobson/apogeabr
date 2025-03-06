import React, { useContext } from 'react'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { FirstCollapsibleContext, SecondCollapsibleContext, withCollapsibleContext } from 'contexts'

import { Div, Nav, NavItem, NavLink, Icon } from 'components'

const Sidebar = ({ children, context = FirstCollapsibleContext, ...props }) => {
    const { width, componentSide } = useContext(context)

    return (
        <Div
            height="100%"
            width={width}
            position="fixed"
            zIndex="1"
            top="0"
            left={componentSide === "left" ? "0" : "auto"}
            right={componentSide === "right" ? "0" : "auto"}
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

const SidebarControl = ({ context = FirstCollapsibleContext }) => {
    const { componentSide, isOpen, marginLeft, marginRight, toggle, setWidth, setMarginLeft, setMarginRight } = useContext(context)

    const onToggle = () => {
        setWidth(isOpen ? "0px" : "300px")

        switch (componentSide) {
            case "left": {
                setMarginLeft(isOpen ? "0px" : "300px")

                break
            }
            case "right": {
                setMarginRight(isOpen ? "0px" : "300px")

                break
            }
            default: break
        }

        toggle()
    }

    return (
        <Div
            height="100%"
            width="75px"
            top="0"
            left={componentSide === "left" ? "0" : "auto"}
            right={componentSide === "right" ? "0" : "auto"}
            marginRight={ componentSide === "right" ? marginRight : "0px" }
            marginLeft={ componentSide === "left" ? marginLeft : "0px" }
            position="fixed"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            transition="0.5s"
        >
            <Nav
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <NavItem
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <NavLink to="#" onClick={onToggle}>
                        {
                            isOpen
                            ? <Icon icon={componentSide === "left" ? faArrowLeft : faArrowRight} color="white" size="2x" opacity=".3" onHover={{ opacity: 1 }} />
                            : <Icon icon={componentSide === "left" ? faArrowRight : faArrowLeft} color="white" size="2x" opacity=".3" onHover={{ opacity: 1 }} />
                        }
                    </NavLink>
                </NavItem>
            </Nav>
        </Div>
    )
}

const Content = ({ children, context = FirstCollapsibleContext, ...props }) => {
    const { componentSide, marginLeft, marginRight } = useContext(context)

    return (
        <Div
            height="100vh"
            marginRight={ componentSide === "right" ? marginRight : "0px" }
            marginLeft={ componentSide === "left" ? marginLeft : "0px" }
            transition="0.5s"
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

const Collapsible = ({ children, context = FirstCollapsibleContext, ...props }) => (
    <Div width="100%" height="100%" {...props}>
        {children}
    </Div>
)

Collapsible.Sidebar = Sidebar
Collapsible.SidebarControl = SidebarControl
Collapsible.Content = Content

export default withCollapsibleContext(Collapsible, { context: FirstCollapsibleContext }, { isOpen: true, width: "300px", marginLeft: "300px" })
export const RightCollapsible = withCollapsibleContext(Collapsible, { context: SecondCollapsibleContext }, { isOpen: true, width: "300px", marginRight: "300px", componentSide: "right" })