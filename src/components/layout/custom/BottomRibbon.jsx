import React from 'react'
import styled from 'styled-components'

import { Row, Ribbon } from 'components'

import { Container } from 'components'

const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: inherit;
    width: inherit;
    flex-direction: column;
    padding: 2rem;
`

const BottomRibbon = ({ payload }) => {
    return (
        <Ribbon payload={payload}>
            {({ title, content }) => (
                <StyledContainer>
                    <Row>
                        <h2 className="text-apogea-600 unselectable">@ApogeaBR</h2>
                    </Row>
                </StyledContainer>
            )}
        </Ribbon>
    )
}

export default BottomRibbon
