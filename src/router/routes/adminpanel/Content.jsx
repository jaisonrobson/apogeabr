import React from 'react'
import { Outlet } from 'react-router-dom'

import AdminPanelContentImage from 'images/layout/adminpanel/adminpanel_content.jpg'

import {
    Col,
    Row,
    SectionBackdrop,
    Div,
    Overlay,
} from 'components'

const Content = () => (
    <SectionBackdrop
        height="100vh"
        backgroundImage={`url(${AdminPanelContentImage})`}
        gradientBackground="transparent"
        backgroundSize="cover"
        backgroundPosition="center"
        margin="0px"
        padding="0px"
        contentAlignmentProps={{ padding: '0', margin:"0" }}
    >
        <SectionBackdrop
            backgroundImage={`url(${AdminPanelContentImage})`}
            gradientBackground="transparent"
            backgroundSize="cover"
            backgroundPosition="center"
            margin="0px"
            padding="0px"
        >
            <Row>
                <Col
                    padding="0rem 3rem"
                    paddingTop="8rem"
                >
                    <Outlet />
                </Col>
            </Row>
        </SectionBackdrop>
    </SectionBackdrop>
)

export default Content
