import React from 'react'
import styled from 'styled-components'

import { faAngry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledIcon = styled(({ paddingTop, ...props }) => <FontAwesomeIcon {...props} />)`
    ${({ paddingTop }) => paddingTop ? `padding-top: ${paddingTop};` : ''}
`

const Icon = (props) => (
    <StyledIcon
        icon={faAngry}
        {...props}
    />
)

export default Icon
