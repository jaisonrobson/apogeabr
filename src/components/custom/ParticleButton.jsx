import React from 'react'

import Particles from 'components/layout/Particles'

const ParticleButton = ({ children, ...props }) => (
    <Particles
        style={{
            width: '100px',
            height: '30px'
        }}
        childrenContainerStyle={{
            flexDirection: 'unset',
            justifyContent: 'unset',
            justifySelf: 'unset',
            alignItems: 'unset',
        }}
        {...props}
    >
        {children}
    </Particles>
)

export default ParticleButton