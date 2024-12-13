import React, { useRef, useEffect } from 'react'

import SmallParchment_01 from 'images/layout/news/small_parchment_divided/small_parchment_01.png'
import SmallParchment_02 from 'images/layout/news/small_parchment_divided/small_parchment_02.png'
import SmallParchment_03 from 'images/layout/news/small_parchment_divided/small_parchment_03.png'
import SmallParchment_04 from 'images/layout/news/small_parchment_divided/small_parchment_04.png'
import SmallParchment_05 from 'images/layout/news/small_parchment_divided/small_parchment_05.png'
import SmallParchment_06 from 'images/layout/news/small_parchment_divided/small_parchment_06.png'
import SmallParchment_07 from 'images/layout/news/small_parchment_divided/small_parchment_07.png'
import SmallParchment_08 from 'images/layout/news/small_parchment_divided/small_parchment_08.png'
import SmallParchment_09 from 'images/layout/news/small_parchment_divided/small_parchment_09.png'

import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

const Board = ({
    contentClassName = "text-gray-400",
    images=[
        SmallParchment_01,
        SmallParchment_02,
        SmallParchment_03,
        SmallParchment_04,
        SmallParchment_05,
        SmallParchment_06,
        SmallParchment_07,
        SmallParchment_08,
        SmallParchment_09
    ],
    styling=[
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ],
    sizingPattern="135px",
    children
}) => {
    const ref = useRef(null)

    useEffect(() => {
    }, [ref])

    return (
    <>
        <Row>
            <Col style={{ backgroundImage: `url(${images[0]})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', maxWidth: sizingPattern, height: sizingPattern, ...styling[0] }} />

            <Col style={{ backgroundImage: `url(${images[1]})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'center', height: sizingPattern, ...styling[1] }} />

            <Col style={{ backgroundImage: `url(${images[2]})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right top', maxWidth: sizingPattern, height: sizingPattern, ...styling[2] }} />
        </Row>
        
        <Row>
            <Col style={{ backgroundImage: `url(${images[3]})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'left', maxWidth: sizingPattern, height: ref?.current?.height, ...styling[3] }} />

            <Col
                ref={ref}
                style={{
                    backgroundImage: images[4] != null ? `url(${images[4]})` : '',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'repeat',
                    ...styling[4]
                }}
                className={contentClassName}
            >
                {children}
            </Col>

            <Col style={{ backgroundImage: `url(${images[5]})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'right', maxWidth: sizingPattern, height: ref?.current?.height, ...styling[5] }} />
        </Row>

        <Row >
            <Col style={{ backgroundImage: `url(${images[6]})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', maxWidth: sizingPattern, height: sizingPattern, ...styling[6] }} />

            <Col style={{ backgroundImage: `url(${images[7]})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', height: sizingPattern, ...styling[7] }} />
            
            <Col style={{ backgroundImage: `url(${images[8]})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', maxWidth: sizingPattern, height: sizingPattern, ...styling[8] }} />
        </Row>
    </>
    )
}

export default Board