import React from 'react'
import styled from 'styled-components'

import { Row, Col, Input } from 'components'

const StyledRow = styled((props) => <Row {...props} />)`
    margin: 10px 0px;
`

const FormattedInput = ({ register, name, label, errorMessage, ...props }) => (
        <StyledRow>
            <Row>
                <Col>
                    {label}
                </Col>

                <Col>
                    <Input {...register(name)} validation={errorMessage} />
                </Col>
            </Row>

            <Row>
                {
                    errorMessage
                        ? (
                            <Col style={{ color: '#FF0000', backgroundColor: '#FFA5A560', fontFamily: 'arial black', borderRadius: '8px', margin: '0px 15px', marginTop: '5px' }}>
                                { errorMessage }
                            </Col>
                        )
                        : <Col />
                }
            </Row>
        </StyledRow>
)

export default FormattedInput