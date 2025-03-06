import React, { useContext } from 'react'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'

import ROUTES from 'router/routes'

import { addSlashIfNeeded } from 'util/string'

import { FirstCollapsibleContext } from 'contexts'

import {
    Navbar,
    Nav,
    NavItem,
    StoneTabletBoard,
    Container,
    TitleH2,
} from 'components'

const Top = () => {
    const { marginLeft } = useContext(FirstCollapsibleContext)
    const location = useLocation()

    return (
        <Navbar marginLeft={marginLeft} padding="0px 10rem" backgroundColor="transparent">
            {({ isShow }) => (
                <StoneTabletBoard
                    width="100%"
                    height="100%"
                    cutPieces={[0, 1, 2]}
                >
                    <Nav navbar className="justify-content-center">
                        <NavItem>
                            <Container
                                marginTop="1rem"
                                marginBottom="-1rem"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                className="unselectable"
                            >
                                <TitleH2 className='text-black' fontFamily='Papyrus'>{_.find(ROUTES, { path: addSlashIfNeeded(location.pathname) }).nickname || "Erro"}</TitleH2>
                            </Container>
                        </NavItem>
                    </Nav>
                </StoneTabletBoard>
            )}
        </Navbar>
    )
}

export default Top