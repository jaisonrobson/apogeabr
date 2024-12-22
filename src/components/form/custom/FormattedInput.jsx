import React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser'

import { Row, Col, Input } from 'components'

const StyledRow = styled((props) => <Row {...props} />)`
    margin: 10px 0px;
`

const FormattedInput = ({ register, name, label, errorMessage, ...props }) => (
        <StyledRow>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    {label}
                </Col>

                <Col>
                    <Input {...register(name)} validation={errorMessage} width="100%" minWidth="300px" {...props} />
                </Col>
            </Row>

            <Row>
                {
                    errorMessage
                        ? (
                            <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: '"arial black"', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                                { parse(errorMessage) }
                            </Col>
                        )
                        : <Col />
                }
            </Row>
        </StyledRow>
)

export default FormattedInput