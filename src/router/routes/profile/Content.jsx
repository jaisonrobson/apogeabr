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
            flexBasis="auto"
            paddingLeft="8%"
            paddingRight="8%"
            paddingTop="10%"
        >
            <Col>
                <Outlet />
            </Col>
        </Row>
    </SectionBackdrop>
)

export default Content
