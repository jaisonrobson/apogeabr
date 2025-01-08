import React from 'react'
import { Outlet } from 'react-router-dom'

import ProfileContentImage from 'images/layout/profile/profile_content.png'

import {
    Col,
    Row,
    SectionBackdrop,
} from 'components'

const Content = () => (
    <SectionBackdrop
        backgroundImage={`url(${ProfileContentImage})`}
        gradientBackground="transparent"
        backgroundSize="cover"
        backgroundPosition="center"
        margin="0px"
        padding="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        flexGrow="1"
        contentAlignmentProps={{ paddingTop: '2rem' }}
    >
        <Row
            display="flex"
            paddingLeft="30%"
            paddingRight="30%"
            paddingTop="10%"
        >
                <Col>
                    <Outlet />
                </Col>
        </Row>
    </SectionBackdrop>
)

export default Content
