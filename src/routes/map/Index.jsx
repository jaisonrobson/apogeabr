import './Index.css'

import React, { forwardRef } from 'react'
import ScrollToTop from "react-scroll-to-top"

import { withReducerContext } from 'contexts/withReducerContext'
import { withModalContext } from 'contexts/withModalContext'

import Top from '../generic/Top'
import Content from './Content'
import Bottom from '../generic/Bottom'

import ScrollToTopButton from 'components/custom/ScrollToTopButton'

const Index = forwardRef((props, ref) => (
    <div ref={ref} {...props} className="index bg-primary">
        <Top />

        <Content />

        <Bottom />

        <ScrollToTop smooth component={<ScrollToTopButton />} width='35' height='35' style={{ padding: 0, margin: 0, backgroundColor: 'gray', zIndex: '9999999'}} />
    </div>
))

export default withReducerContext(withModalContext(Index))