import React, { useRef, useEffect } from 'react'

import WoodParchment_01 from 'images/layout/generic/wood_parchment_divided/wood_parchment_01.png'
import WoodParchment_02 from 'images/layout/generic/wood_parchment_divided/wood_parchment_02.png'
import WoodParchment_03 from 'images/layout/generic/wood_parchment_divided/wood_parchment_03.png'
import WoodParchment_04 from 'images/layout/generic/wood_parchment_divided/wood_parchment_04.png'
import WoodParchment_05 from 'images/layout/generic/wood_parchment_divided/wood_parchment_05.png'
import WoodParchment_06 from 'images/layout/generic/wood_parchment_divided/wood_parchment_06.png'
import WoodParchment_07 from 'images/layout/generic/wood_parchment_divided/wood_parchment_07.png'
import WoodParchment_08 from 'images/layout/generic/wood_parchment_divided/wood_parchment_08.png'
import WoodParchment_09 from 'images/layout/generic/wood_parchment_divided/wood_parchment_09.png'

import { Col, Row } from 'components'

const Board = ({
    contentClassName = "text-gray-400",
    images=[
        WoodParchment_01,
        WoodParchment_02,
        WoodParchment_03,
        WoodParchment_04,
        WoodParchment_05,
        WoodParchment_06,
        WoodParchment_07,
        WoodParchment_08,
        WoodParchment_09
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
    children,
    ...props
}) => {
    const ref = useRef(null)

    useEffect(() => {
    }, [ref])

    return (
        <div {...props}>
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
        </div>
    )
}

export default Board