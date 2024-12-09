import React from 'react'
import styled from 'styled-components'

import Container from 'components/layout/Container'
import Row from 'components/layout/Row'
import Ribbon from 'components/layout/Ribbon'

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
