import React from 'react'

import GoldBoardHorizontal from 'images/layout/generic/gold_board_divided/goldboard_horizontal.png'
import GoldBoardVertical from 'images/layout/generic/gold_board_divided/goldboard_vertical.png'
import GoldBoardLeftBottom from 'images/layout/generic/gold_board_divided/goldboard_leftbottom.png'
import GoldBoardLeftTop from 'images/layout/generic/gold_board_divided/goldboard_lefttop.png'
import GoldBoardRightBottom from 'images/layout/generic/gold_board_divided/goldboard_rightbottom.png'
import GoldBoardRightTop from 'images/layout/generic/gold_board_divided/goldboard_righttop.png'

import { LoremIpsumParagraphs } from 'data/LoremIpsum'

import { Row, Col } from 'components'

const GoldBoard = ({ contentClassName = "text-gray-400", children = <LoremIpsumParagraphs /> }) => (
    <>
        <Row >
            <Col style={{ backgroundImage: `url(${GoldBoardLeftTop})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', maxWidth: '135px', height: '135px' }} />
            <Col style={{ backgroundImage: `url(${GoldBoardHorizontal})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'top', height: '135px' }} />
            <Col style={{ backgroundImage: `url(${GoldBoardRightTop})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right top', maxWidth: '135px', height: '135px' }} />
        </Row>
        <Row className={contentClassName}>
            <Col style={{ backgroundImage: `url(${GoldBoardVertical}), url(${GoldBoardVertical})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'left, right', marginLeft: '23px', marginRight: '23px', paddingLeft: '50px', paddingRight: '50px' }}>
                {children}
            </Col>
        </Row>
        <Row >
            <Col style={{ backgroundImage: `url(${GoldBoardLeftBottom})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', maxWidth: '165px', height: '165px' }} />
            <Col style={{ backgroundImage: `url(${GoldBoardHorizontal})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', height: '170px' }} />
            <Col style={{ backgroundImage: `url(${GoldBoardRightBottom})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', maxWidth: '165px', height: '165px' }} />
        </Row>
    </>
)

export default GoldBoard